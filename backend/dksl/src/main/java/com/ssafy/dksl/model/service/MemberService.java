package com.ssafy.dksl.model.service;

import com.ssafy.dksl.model.dto.MemberDto;
import com.ssafy.dksl.model.dto.command.LoginCommand;
import com.ssafy.dksl.model.dto.command.TokenCommand;
import com.ssafy.dksl.model.dto.command.RegisterCommand;
import com.ssafy.dksl.model.dto.command.UpdateSummonerCommand;
import com.ssafy.dksl.model.dto.response.LoginResponse;
import com.ssafy.dksl.model.dto.response.MemberResponse;
import com.ssafy.dksl.model.dto.response.SummonerResponse;
import com.ssafy.dksl.model.entity.Member;
import com.ssafy.dksl.util.exception.*;
import org.springframework.stereotype.Service;

import javax.security.auth.login.LoginException;
import java.util.Map;

@Service
public interface MemberService {
    boolean register(RegisterCommand registerCommand) throws RegisterException;
    LoginResponse login(LoginCommand loginCommand) throws LoginException;
    boolean logout(TokenCommand tokenCommand) throws LogoutException;
    SummonerResponse updateSummoner(UpdateSummonerCommand updateSummonerCommand) throws GetDataException;
    MemberResponse updateMember(Member member) throws RiotApiException;
    String reissue(TokenCommand tokenCommand) throws LoginException;
}
