package com.ssafy.dksl.model.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.dksl.model.dto.SummonerDto;
import com.ssafy.dksl.model.dto.MemberDto;
import com.ssafy.dksl.model.entity.Member;
import com.ssafy.dksl.model.entity.MemberRedis;
import com.ssafy.dksl.model.repository.MemberRedisRepository;
import com.ssafy.dksl.model.repository.MemberRepository;
import com.ssafy.dksl.util.JwtUtil;
import com.ssafy.dksl.util.exception.RegisterException;
import com.ssafy.dksl.util.exception.UpdateDataException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.security.auth.login.LoginException;
import java.io.IOException;
import java.net.URI;
import java.net.URLEncoder;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

@Service
@Slf4j
public class MemberServiceImpl implements MemberService {
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;

    @Value("${riot.summoner.api.key}")
    private String RIOT_SUMMONER_API_KEY;

    @Value("${riot.summoner.api.uri}")
    private String RIOT_SUMMONER_API_URI;

    private final JwtUtil jwtUtil;
    private final MemberRepository memberRepository;
    private final MemberRedisRepository memberRedisRepository;

    @Autowired
    MemberServiceImpl(PasswordEncoder passwordEncoder, AuthenticationManagerBuilder authenticationManagerBuilder, JwtUtil jwtUtil, MemberRepository memberRepository, MemberRedisRepository memberRedisRepository){
        this.passwordEncoder = passwordEncoder;
        this.authenticationManagerBuilder = authenticationManagerBuilder;
        this.jwtUtil = jwtUtil;

        this.memberRepository = memberRepository;
        this.memberRedisRepository = memberRedisRepository;
    }

    public boolean register(MemberDto memberDto) throws RegisterException {
        // 가입되어 있는 아이디인지 확인
        if(memberRepository.findByClientId(memberDto.getClientId()).isPresent()) {
            throw new RegisterException("해당 아이디를 가진 회원이 이미 존재합니다.");
        } else if(memberRepository.findByName(memberDto.getName()).isPresent()) {
            throw new RegisterException("해당 닉네임을 가진 회원이 이미 존재합니다.");
        }

        try {
            SummonerDto summonerDto = callApi(memberDto.getName());

            Member member = Member.builder()
                    .clientId(memberDto.getClientId())
                    .password(passwordEncoder.encode(memberDto.getPassword()))
                    .name(summonerDto.getName())
                    .puuid(summonerDto.getPuuid())
                    .email(memberDto.getEmail())
                    .build();

            memberRepository.save(member);

            return true;
        } catch (Exception e) {
            log.error(e.getMessage());
            throw new RegisterException();
        }
    }

    @Override
    public MemberDto login(MemberDto memberDto) throws LoginException {
        // 가입되어 있는 아이디인지 확인
        Member member = memberRepository.findByClientId(memberDto.getClientId()).orElseThrow(() -> new LoginException("아이디 혹은 비밀번호를 틀렸습니다."));

        if(!passwordEncoder.matches(memberDto.getPassword(), member.getPassword())) {
            throw new LoginException("아이디 혹은 비밀번호를 틀렸습니다.");
        }

        if(memberRedisRepository.findById(member.getPuuid()).isPresent()) {
            throw new LoginException("중복 로그인 하였습니다.");
        }

         String token = jwtUtil.generateToken(member.getClientId(), "ROLE_USER");
         System.out.println("토큰 정보 : " + token);

        // Redis에 토큰 넣기
        MemberRedis memberRedis = MemberRedis.builder()
                .clientId(member.getClientId())
                .refreshToken(token)
                .build();

        memberRedisRepository.save(memberRedis);

        return MemberDto.builder()
                .name(member.getName())
                .refreshToken(token)
                .build();
    }

    @Override
    public boolean updateMember(String token, MemberDto memberDto) throws UpdateDataException {
        System.out.println("토큰 정보 : " + token);
        MemberRedis memberRedis = memberRedisRepository.findById(memberDto.getClientId()).orElseThrow(() -> new UpdateDataException("회원정보가 존재하지 않습니다."));
        if (!jwtUtil.getClientId(memberRedis.getRefreshToken()).equals(jwtUtil.getClientId(token))) {
            throw new UpdateDataException("회원 정보가 일치하지 않습니다..");
        }

        Member member = memberRepository.findByClientId(jwtUtil.getClientId(token)).orElseThrow(() -> new UpdateDataException("회원정보가 존재하지 않습니다."));
        /*
            TO DO : 소속 추가
         */

        try {
            member = Member.builder()
                    .id(member.getId())
                    .clientId(member.getClientId())
                    .password(member.getPassword())
                    .name(memberDto.getName())
                    .puuid(member.getPuuid())
                    .email(memberDto.getEmail())
                    .teams(member.getTeams())
                    .build();

            memberRepository.save(member);

            return true;

        } catch(Exception e) {
            log.error(e.getMessage());
            throw new UpdateDataException();
        }
    }

    private SummonerDto callApi(String name) throws RegisterException {
        HttpClient client = HttpClient.newBuilder().build();

        HttpRequest getRequest = HttpRequest.newBuilder()
                .uri(URI.create(RIOT_SUMMONER_API_URI + URLEncoder.encode(name)))
                .header("X-Riot-Token", RIOT_SUMMONER_API_KEY)
                .GET()
                .build();

        try {
            HttpResponse<String> response = client.send(getRequest, HttpResponse.BodyHandlers.ofString());

            // 응답 코드 확인
            int statusCode = response.statusCode();
            if(statusCode != 200) throw new RegisterException("해당 닉네임을 찾을 수 없습니다.");

            ObjectMapper objectmapper = new ObjectMapper();
            return objectmapper.readValue(response.body(), SummonerDto.class);  // DTO에 정보 삽입
        } catch (IOException | InterruptedException e) {
            log.error(e.getMessage());
            throw new RegisterException();
        }
    }
}
