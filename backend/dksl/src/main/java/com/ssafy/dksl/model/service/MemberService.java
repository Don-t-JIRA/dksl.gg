package com.ssafy.dksl.model.service;

import com.ssafy.dksl.model.dto.MemberDto;
import com.ssafy.dksl.model.dto.command.LoginCommand;
import com.ssafy.dksl.model.dto.command.LogoutCommand;
import com.ssafy.dksl.model.dto.command.RegisterCommand;
import com.ssafy.dksl.model.dto.response.LoginResponse;
import com.ssafy.dksl.util.exception.LogoutException;
import com.ssafy.dksl.util.exception.RegisterException;
import com.ssafy.dksl.util.exception.UpdateDataException;
import org.springframework.stereotype.Service;

import javax.security.auth.login.LoginException;

@Service
public interface MemberService {
    boolean register(RegisterCommand registerCommand) throws RegisterException;
    LoginResponse login(LoginCommand loginCommand) throws LoginException;
    boolean logout(LogoutCommand logoutCommand) throws LogoutException;
}
