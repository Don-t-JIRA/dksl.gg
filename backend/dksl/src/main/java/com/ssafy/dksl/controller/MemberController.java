package com.ssafy.dksl.controller;

import com.ssafy.dksl.model.dto.command.TokenCommand;
import com.ssafy.dksl.model.dto.command.UpdateSummonerCommand;
import com.ssafy.dksl.model.dto.request.LoginRequest;
import com.ssafy.dksl.model.dto.request.RegisterRequest;
import com.ssafy.dksl.model.dto.response.MyTeamResponse;
import com.ssafy.dksl.model.service.MemberServiceImpl;
import com.ssafy.dksl.model.service.TeamServiceImpl;
import com.ssafy.dksl.util.exception.GetDataException;
import com.ssafy.dksl.util.exception.LogoutException;
import com.ssafy.dksl.util.exception.RegisterException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.security.auth.login.LoginException;

@RestController
@RequestMapping("member")
@CrossOrigin
public class MemberController {

    private final MemberServiceImpl memberService;
    private final TeamServiceImpl teamService;

    @Autowired
    MemberController(MemberServiceImpl memberService, TeamServiceImpl teamService) {
        this.memberService = memberService;
        this.teamService = teamService;
    }

    @PostMapping("register")
    private ResponseEntity<?> register(@RequestBody RegisterRequest registerRequest) {
        try {
            return ResponseEntity.ok(memberService.register(registerRequest.toRegisterCommand()));
        } catch (RegisterException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);  // 에러 츌력
        }
    }

    @PostMapping("login")
    private ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        try {
            return ResponseEntity.ok(memberService.login(loginRequest.toLoginCommand()));
        } catch (LoginException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);  // 에러 츌력
        }
    }

    @PostMapping("logout")
    private ResponseEntity<?> logout(@RequestHeader("Authorization") String accessToken) {
        try {
            return ResponseEntity.ok(memberService.logout(TokenCommand.builder().accessToken(accessToken).build()));
        } catch (LogoutException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);  // 에러 츌력
        }
    }

    @GetMapping("my-team")
    private ResponseEntity<?> getMyTeamList(@RequestHeader("Authorization") String accessToken) {
        try {
            MyTeamResponse myTeamResponse = MyTeamResponse.builder()
                    .myTeamList(teamService.getMyTeamList(TokenCommand.builder().accessToken(accessToken).build()))
                    .orderTeamList(teamService.getOrderTeamList())
                    .build();

            return ResponseEntity.ok(myTeamResponse);
        } catch (GetDataException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);  // 에러 츌력
        }
    }

    @GetMapping("update")
    private ResponseEntity<?> updateMember(String name) {
        try {
            return ResponseEntity.ok(memberService.updateMember(UpdateSummonerCommand.builder().name(name).build()));
        } catch (GetDataException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);  // 에러 츌력
        }
    }

    @GetMapping("/reissue")
    private ResponseEntity<?> reissue(@RequestHeader("Authorization") String accessToken) {
        try {
            return ResponseEntity.ok(memberService.reissue(TokenCommand.builder().accessToken(accessToken).build()));
        } catch (LoginException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);  // 에러 츌력
        }
    }
}
