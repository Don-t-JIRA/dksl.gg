package com.ssafy.dksl.model.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.ssafy.dksl.model.dto.command.LoginCommand;
import com.ssafy.dksl.model.dto.command.LogoutCommand;
import com.ssafy.dksl.model.dto.command.RegisterCommand;
import com.ssafy.dksl.model.dto.response.LoginResponse;
import com.ssafy.dksl.model.entity.Member;
import com.ssafy.dksl.model.entity.RefreshToken;
import com.ssafy.dksl.model.entity.Tier;
import com.ssafy.dksl.model.repository.RefreshTokenRepository;
import com.ssafy.dksl.model.repository.MemberRepository;
import com.ssafy.dksl.model.repository.TierRepository;
import com.ssafy.dksl.model.service.common.RiotServiceImpl;
import com.ssafy.dksl.util.JwtUtil;
import com.ssafy.dksl.util.data.RankData;
import com.ssafy.dksl.util.exception.LogoutException;
import com.ssafy.dksl.util.exception.RegisterException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.security.auth.login.LoginException;

@Service
@Slf4j
public class MemberServiceImpl extends RiotServiceImpl implements MemberService, RankData {
    private final PasswordEncoder passwordEncoder;

    private final JwtUtil jwtUtil;
    private final MemberRepository memberRepository;
    private final RefreshTokenRepository refreshTokenRepository;
    private final TierRepository tierRepository;

    @Autowired
    MemberServiceImpl(PasswordEncoder passwordEncoder, JwtUtil jwtUtil, MemberRepository memberRepository, RefreshTokenRepository refreshTokenRepository, TierRepository tierRepository){
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;

        this.memberRepository = memberRepository;
        this.refreshTokenRepository = refreshTokenRepository;
        this.tierRepository = tierRepository;
    }

    public boolean register(RegisterCommand registerCommand) throws RegisterException {
        // 아이디 가입 여부 확인
        if(memberRepository.findByClientId(registerCommand.getClientId()).isPresent()) {
            throw new RegisterException("해당 아이디를 가진 회원이 이미 존재합니다.");
        }

        // 닉네임 가입 여부 확인
        if(memberRepository.findByName(registerCommand.getName()).isPresent()) {
            throw new RegisterException("해당 닉네임을 가진 회원이 이미 존재합니다.");
        }

        try {
            JsonNode summonerNode = findSummonerByName(registerCommand.getName());  // 회원 PUUID 찾기
            JsonNode leagueNode = findLeagueBySummonerId(summonerNode.get("id").asText());  // 회원 티어, 랭크 찾기

            Tier tier = tierRepository.findById((leagueNode.size() != 0)? leagueNode.get(0).get("tier").asText().toLowerCase() : "unranked")
                    .orElseThrow(() -> new RegisterException("랭크 정보를 조회할 수 없습니다."));
            int rank = (leagueNode.size() != 0)? RankData.rank.get(leagueNode.get(0).get("rank").asText()) : 0;


            Member member = Member.builder()
                    .clientId(registerCommand.getClientId())
                    .password(passwordEncoder.encode(registerCommand.getPassword()))
                    .name(registerCommand.getName())
                    .puuid(summonerNode.get("puuid").asText())
                    .phone(registerCommand.getPhone().replace("-", ""))
                    .email(registerCommand.getEmail())
                    .tier(tier)
                    .rank(rank)
                    .level(summonerNode.get("summonerLevel").asInt())
                    .build();

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

        // 비밀번호 일치하는지 확인
        if(!passwordEncoder.matches(loginCommand.getPassword(), member.getPassword())) {
            throw new LoginException("아이디 혹은 비밀번호를 틀렸습니다.");
        }

        // 중복 로그인 되었는지 확인 (redis에 refreshToken 존재하는지)
        if(refreshTokenRepository.findById(member.getPuuid()).isPresent()) {
            throw new LoginException("중복 로그인 하였습니다.");
        }

        // Access 토큰 발급
        String accessToken = jwtUtil.generateToken(member.getClientId(), "ROLE_USER", false);
        log.info("Access Token 정보 : " + accessToken);

        // Refresh 토큰 발급 후 Redis에 저장
        RefreshToken refreshToken = RefreshToken.builder()
                .clientId(member.getClientId())
                .refreshToken(jwtUtil.generateToken(member.getClientId(), "ROLE_USER", true))
                .build();
        log.info("Refresh Token 정보 : " + refreshToken.getRefreshToken());

        refreshTokenRepository.save(refreshToken);

        log.info("Member 정보 : " + member);

        return LoginResponse.builder()
                .memberDto(member.toMemberDto())
                .refreshToken(accessToken)
                .build();
    }

    @Override
    public boolean logout(LogoutCommand logoutCommand) throws LogoutException {
        RefreshToken refreshToken = refreshTokenRepository.findById(jwtUtil.getClientId(logoutCommand.getAccessToken())).orElseThrow(() -> new LogoutException("로그인이 되어있지 않습니다."));
        refreshTokenRepository.delete(refreshToken);

        return true;
    }
}
