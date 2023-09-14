package com.ssafy.dksl.model.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.dksl.model.dto.SummonerDto;
import com.ssafy.dksl.model.dto.UserDto;
import com.ssafy.dksl.model.entity.User;
import com.ssafy.dksl.model.repository.UserRepository;
import com.ssafy.dksl.util.exception.RegisterException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
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
public class UserServiceImpl implements UserService {
    private final PasswordEncoder passwordEncoder;

    @Value("${riot.summoner.api.key}")
    private String RIOT_SUMMONER_API_KEY;

    @Value("${riot.summoner.api.uri}")
    private String RIOT_SUMMONER_API_URI;

    private final UserRepository userRepository;

    @Autowired
    UserServiceImpl(PasswordEncoder passwordEncoder, UserRepository userRepository){
        this.passwordEncoder = passwordEncoder;
        this.userRepository = userRepository;
    }

    public boolean register(UserDto userDto) throws RegisterException {
        // 가입되어 있는 아이디인지 확인
        if(userRepository.findByClientId(userDto.getClientId()).isPresent()) {
            throw new RegisterException("해당 아이디를 가진 회원이 이미 존재합니다.");
        } else if(userRepository.findByName(userDto.getName()).isPresent()) {
            throw new RegisterException("해당 닉네임을 가진 회원이 이미 존재합니다.");
        }

        try {
            SummonerDto summonerDto = callApi(userDto.getName());

            User user = User.builder()
                    .clientId(userDto.getClientId())
                    .password(passwordEncoder.encode(userDto.getPassword()))
                    .name(summonerDto.getName())
                    .puuid(summonerDto.getPuuid())
                    .build();

            userRepository.save(user);

            return true;
        } catch (Exception e) {
            log.error(e.getMessage());
            throw new RegisterException("회원 생성에 실패하였습니다.");
        }
    }

    @Override
    public UserDto login(UserDto userDto) throws LoginException {
        // 가입되어 있는 아이디인지 확인
        User user = userRepository.findByClientId(userDto.getClientId()).orElseThrow(() -> new LoginException("아이디 혹은 비밀번호를 틀렸습니다."));

        if(!passwordEncoder.matches(userDto.getPassword(), user.getPassword())) {
            System.out.println("입력 password : " + passwordEncoder.encode(userDto.getPassword().trim()));
            System.out.println("원래 password : " + user.getPassword().trim());
            throw new LoginException("아이디 혹은 비밀번호를 틀렸습니다.");
        }

        /*
            TO DO :: Redis에 토큰 넣기
         */

        return UserDto.builder()
                .name(user.getName())
                .build();
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
