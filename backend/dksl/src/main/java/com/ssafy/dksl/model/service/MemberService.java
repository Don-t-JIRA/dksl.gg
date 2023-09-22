package com.ssafy.dksl.model.service;

import com.ssafy.dksl.model.dto.MemberDto;
import com.ssafy.dksl.util.exception.RegisterException;
import com.ssafy.dksl.util.exception.UpdateDataException;
import org.springframework.stereotype.Service;

import javax.security.auth.login.LoginException;

@Service
public interface MemberService {
    boolean register(MemberDto memberDto) throws RegisterException;
    MemberDto login(MemberDto memberDto) throws LoginException;
    boolean updateMember(String token, MemberDto memberDto) throws UpdateDataException;
}
