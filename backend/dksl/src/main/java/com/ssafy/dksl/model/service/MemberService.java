package com.ssafy.dksl.model.service;

import com.ssafy.dksl.model.dto.command.LoginCommand;
import com.ssafy.dksl.model.dto.command.TokenCommand;
import com.ssafy.dksl.model.dto.command.RegisterCommand;
import com.ssafy.dksl.model.dto.command.UpdateSummonerCommand;
import com.ssafy.dksl.model.dto.response.LoginResponse;
import com.ssafy.dksl.model.dto.response.MemberResponse;
import com.ssafy.dksl.model.dto.response.SummonerResponse;
import com.ssafy.dksl.model.entity.Member;
import com.ssafy.dksl.util.exception.*;
import com.ssafy.dksl.util.exception.common.CustomException;
import org.springframework.stereotype.Service;

import javax.security.auth.login.LoginException;

@Service
public interface MemberService {
    boolean register(RegisterCommand registerCommand) throws CustomException;
    LoginResponse login(LoginCommand loginCommand) throws CustomException;
    MemberResponse getMember(TokenCommand tokenCommand) throws CustomException;
    boolean logout(TokenCommand tokenCommand) throws CustomException;
    SummonerResponse updateSummoner(UpdateSummonerCommand updateSummonerCommand) throws CustomException;
    MemberResponse updateMember(Member member) throws CustomException;
    String reissue(TokenCommand tokenCommand) throws LoginException, CustomException;
}
