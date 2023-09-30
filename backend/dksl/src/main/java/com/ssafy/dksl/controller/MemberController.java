package com.ssafy.dksl.controller;

import com.ssafy.dksl.model.dto.command.TokenCommand;
import com.ssafy.dksl.model.dto.command.UpdateSummonerCommand;
import com.ssafy.dksl.model.dto.request.LoginRequest;
import com.ssafy.dksl.model.dto.request.RegisterRequest;
import com.ssafy.dksl.model.service.MemberService;
import com.ssafy.dksl.util.exception.common.CustomException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("member")
@CrossOrigin
public class MemberController {

    private final MemberService memberService;

    @Autowired
    MemberController(MemberService memberService) {
        this.memberService = memberService;
    }

    @PostMapping("register")
    private ResponseEntity<?> register(@RequestBody RegisterRequest registerRequest) {
        try {
            return ResponseEntity.ok(memberService.register(registerRequest.toRegisterCommand()));
        } catch (CustomException e) {
            return new ResponseEntity<>(e.getMessage(), e.getHttpStatus());
        }
    }

    @PostMapping("login")
    private ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        try {
            return ResponseEntity.ok(memberService.login(loginRequest.toLoginCommand()));
        } catch (CustomException e) {
            return new ResponseEntity<>(e.getMessage(), e.getHttpStatus());
        }
    }

    @PostMapping("logout")
    private ResponseEntity<?> logout(@RequestHeader("Authorization") String accessToken) {
        try {
            return ResponseEntity.ok(memberService.logout(TokenCommand.builder().token(accessToken).build()));
        } catch (CustomException e) {
            return new ResponseEntity<>(e.getMessage(), e.getHttpStatus());
        }
    }

    @GetMapping
    private ResponseEntity<?> getMember(@RequestHeader("Authorization") String accessToken) {
        try {
            return ResponseEntity.ok(memberService.getMember(TokenCommand.builder().token(accessToken).build()));
        } catch (CustomException e) {
            return new ResponseEntity<>(e.getMessage(), e.getHttpStatus());
        }
    }

    @GetMapping("update")
    private ResponseEntity<?> updateSummoner(@RequestParam("name") String name) {
        try {
            return ResponseEntity.ok(memberService.updateSummoner(UpdateSummonerCommand.builder().name(name).build()));
        } catch (CustomException e) {
            return new ResponseEntity<>(e.getMessage(), e.getHttpStatus());
        }
    }

    @GetMapping("/reissue")
    private ResponseEntity<?> reissue(@RequestHeader("Authorization") String refreshToken) {
        try {
            return ResponseEntity.ok(memberService.reissue(TokenCommand.builder().token(refreshToken).build()));
        } catch (CustomException e) {
            return new ResponseEntity<>(e.getMessage(), e.getHttpStatus());
        }
    }
}
