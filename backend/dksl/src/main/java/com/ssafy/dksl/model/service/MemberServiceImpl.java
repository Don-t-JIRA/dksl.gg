package com.ssafy.dksl.model.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.ssafy.dksl.model.dto.command.LoginCommand;
import com.ssafy.dksl.model.dto.command.TokenCommand;
import com.ssafy.dksl.model.dto.command.RegisterCommand;
import com.ssafy.dksl.model.dto.command.UpdateSummonerCommand;
import com.ssafy.dksl.model.dto.response.LoginResponse;
import com.ssafy.dksl.model.dto.response.MemberResponse;
import com.ssafy.dksl.model.dto.response.SummonerResponse;
import com.ssafy.dksl.model.dto.response.TierResponse;
import com.ssafy.dksl.model.entity.Member;
import com.ssafy.dksl.model.entity.RefreshToken;
import com.ssafy.dksl.model.entity.Tier;
import com.ssafy.dksl.model.repository.RefreshTokenRepository;
import com.ssafy.dksl.model.repository.MemberRepository;
import com.ssafy.dksl.model.repository.TierRepository;
import com.ssafy.dksl.model.service.common.RiotServiceImpl;
import com.ssafy.dksl.util.JwtUtil;
import com.ssafy.dksl.util.data.RankData;
import com.ssafy.dksl.util.exception.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.security.auth.login.LoginException;
import java.util.HashMap;
import java.util.Map;

@Service
@Slf4j
public class MemberServiceImpl extends RiotServiceImpl implements MemberService, RankData {
    private final PasswordEncoder passwordEncoder;

    private final JwtUtil jwtUtil;
    private final String BASE_IMG_URI;
    private final MemberRepository memberRepository;
    private final RefreshTokenRepository refreshTokenRepository;
    private final TierRepository tierRepository;


    @Autowired
    MemberServiceImpl(PasswordEncoder passwordEncoder, JwtUtil jwtUtil, @Value("${base.img.uri}") String baseImgUri, MemberRepository memberRepository, RefreshTokenRepository refreshTokenRepository, TierRepository tierRepository) {
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
        this.BASE_IMG_URI = baseImgUri;

        this.memberRepository = memberRepository;
        this.refreshTokenRepository = refreshTokenRepository;
        this.tierRepository = tierRepository;
    }

    public boolean register(RegisterCommand registerCommand) throws RegisterException {
        // 아이디 가입 여부 확인
        if (memberRepository.findByClientId(registerCommand.getClientId()).isPresent()) {
            throw new RegisterException("해당 아이디를 가진 회원이 이미 존재합니다.");
        }

        // 닉네임 가입 여부 확인
        if (memberRepository.findByName(registerCommand.getName()).isPresent()) {
            throw new RegisterException("해당 닉네임을 가진 회원이 이미 존재합니다.");
        }

        try {
            JsonNode summonerNode = findSummonerByName(registerCommand.getName());  // 회원 PUUID 찾기
            JsonNode leagueNode = findLeagueBySummonerId(summonerNode.get("id").asText());  // 회원 티어, 랭크 찾기

            Tier tier = tierRepository.findById((leagueNode.size() != 0) ? leagueNode.get(0).get("tier").asText().toLowerCase() : "unranked").orElseThrow(() -> new RiotApiException("랭크 정보를 조회할 수 없습니다."));
            int rank = (leagueNode.size() != 0) ? RankData.rank.get(leagueNode.get(0).get("rank").asText()) : 0;

            Member member = Member.builder().clientId(registerCommand.getClientId()).password(passwordEncoder.encode(registerCommand.getPassword())).name(registerCommand.getName()).puuid(summonerNode.get("puuid").asText()).phone(registerCommand.getPhone().replace("-", "")).email(registerCommand.getEmail()).tier(tier).rank(rank).profileIconId(summonerNode.get("profileIconId").asInt()).level(summonerNode.get("summonerLevel").asInt()).build();

            memberRepository.save(member);

            return true;
        } catch (Exception e) {
            log.error(e.getMessage());
            throw new RegisterException();
        }
    }

    @Override
    public LoginResponse login(LoginCommand loginCommand) throws LoginException {
        // 가입되어 있는 아이디인지 확인
        Member member = memberRepository.findByClientId(loginCommand.getClientId()).orElseThrow(() -> new LoginException("아이디 혹은 비밀번호를 틀렸습니다."));
        MemberResponse memberResponse = null;

        // 비밀번호 일치하는지 확인
        if (!passwordEncoder.matches(loginCommand.getPassword(), member.getPassword())) {
            throw new LoginException("아이디 혹은 비밀번호를 틀렸습니다.");
        }

        // 중복 로그인 되었는지 확인 (redis에 refreshToken 존재하는지)
        if (refreshTokenRepository.findById(member.getClientId()).isPresent()) {
            throw new LoginException("중복 로그인 하였습니다.");
        }

        try {
            memberResponse = updateMember(member);
        } catch (RiotApiException e) {
            throw new LoginException("정보를 업데이트 할 수 없습니다.");
        }

        try {
            // Access 토큰 발급
            String accessToken = jwtUtil.generateToken(member.getClientId(), "ROLE_USER", false);

            // Refresh 토큰 발급 후 Redis에 저장
            RefreshToken refreshToken = RefreshToken.builder().clientId(member.getClientId()).refreshToken(jwtUtil.generateToken(member.getClientId(), "ROLE_USER", true)).build();

            refreshTokenRepository.save(refreshToken);

            return LoginResponse.builder().memberResponse(memberResponse).accessToken(accessToken).refreshToken(refreshToken.getRefreshToken()).build();
        } catch (Exception e) {
            throw new LoginException("로그인을 할 수 없습니다.");
        }
    }

    @Override
    public boolean logout(TokenCommand tokenCommand) throws LogoutException {
        RefreshToken refreshToken = refreshTokenRepository.findById(jwtUtil.getClientId(tokenCommand.getToken())).orElseThrow(() -> new LogoutException("로그인이 되어있지 않습니다."));
        refreshTokenRepository.delete(refreshToken);

        return true;
    }

    @Override
    public SummonerResponse updateSummoner(UpdateSummonerCommand updateSummonerCommand) throws GetDataException {
        Member member = memberRepository.findByName(updateSummonerCommand.getName()).orElseThrow(() -> new GetDataException("회원 조회에 실패 했습니다."));
        try {
            MemberResponse memberResponse = updateMember(member);
            return SummonerResponse.builder()
                    .name(memberResponse.getName())
                    .tier(memberResponse.getTier())
                    .rank(memberResponse.getRank())
                    .profileIconId(memberResponse.getProfileIconId())
                    .level(memberResponse.getLevel())
                    .build();
        } catch(RiotApiException e) {
            throw new GetDataException("회원 정보 업데이트에 실패 했습니다.");
        }
    }

    @Override
    public String reissue(TokenCommand tokenCommand) throws LoginException {
        // refresh 토큰 만료 확인
        RefreshToken refreshToken = refreshTokenRepository.findByRefreshToken(tokenCommand.getToken()).orElseThrow(() -> new LoginException("재로그인이 필요합니다."));

        // refresh 토큰 검증을 통한 access 토큰 재발급
        return jwtUtil.generateToken(jwtUtil.getClientId(refreshToken.getRefreshToken()), "ROLE_USER", false);
    }

    @Override
    public MemberResponse updateMember(Member member) throws RiotApiException {
        try {
            JsonNode summonerNode = findSummonerByName(member.getName());  // 회원 PUUID 찾기
            JsonNode leagueNode = findLeagueBySummonerId(summonerNode.get("id").asText());  // 회원 티어, 랭크 찾기

            Tier tier = tierRepository.findById((leagueNode.size() != 0) ? leagueNode.get(0).get("tier").asText().toLowerCase() : "unranked").orElseThrow(() -> new RiotApiException("랭크 정보를 조회할 수 없습니다."));
            int rank = (leagueNode.size() != 0) ? RankData.rank.get(leagueNode.get(0).get("rank").asText()) : 0;

            member = Member.builder().id(member.getId()).clientId(member.getClientId()).password(member.getPassword()).name(member.getName()).puuid(summonerNode.get("puuid").asText()).phone(member.getPhone().replace("-", "")).email(member.getEmail()).tier(tier).rank(rank).profileIconId(summonerNode.get("profileIconId").asInt()).level(summonerNode.get("summonerLevel").asInt()).build();

            memberRepository.save(member);

            return MemberResponse.builder().name(member.getName()).phone(member.getPhone()).email(member.getEmail()).tier(member.getTier().toTierResponse()).rank(member.getRank()).profileIconId(member.getProfileIconId()).level(member.getLevel()).build();
        } catch (Exception e) {
            log.error(e.getMessage());
            throw new RiotApiException("라이엇 정보를 업데이트 할 수 없습니다.");
        }
    }
}
