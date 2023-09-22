package com.ssafy.dksl.controller;

import com.ssafy.dksl.model.dto.MemberDto;
import com.ssafy.dksl.model.service.MemberServiceImpl;
import com.ssafy.dksl.util.exception.RegisterException;
import com.ssafy.dksl.util.exception.UpdateDataException;
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

    @Autowired
    MemberController(MemberServiceImpl memberService) {
        this.memberService = memberService;
    }

    @PostMapping("register")
    private ResponseEntity<?> register(@RequestBody MemberDto memberDto) {
        try {
            return ResponseEntity.ok(memberService.register(memberDto));
        } catch (RegisterException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);  // 에러 츌력
        }
    }

    @PostMapping("login")
    private ResponseEntity<?> login(@RequestBody MemberDto memberDto) {
        try {
            return ResponseEntity.ok(memberService.login(memberDto));
        } catch (LoginException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);  // 에러 츌력
        }
    }

    @PostMapping("update")
    private ResponseEntity<?> updateMember(@RequestHeader("Authorization") String token, @RequestBody MemberDto memberDto) {
        try {
            System.out.println(memberService.updateMember(token, memberDto));
            return ResponseEntity.ok("");
        } catch(UpdateDataException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);  // 에러 츌력
        }
    }
}
