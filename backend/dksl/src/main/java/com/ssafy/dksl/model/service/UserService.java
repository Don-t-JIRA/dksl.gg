package com.ssafy.dksl.model.service;

import com.ssafy.dksl.model.dto.UserDto;
import com.ssafy.dksl.util.exception.RegisterException;
import org.springframework.stereotype.Service;

import javax.security.auth.login.LoginException;

@Service
public interface UserService {
    public boolean register(UserDto userDto) throws RegisterException;
    UserDto login(UserDto userDto) throws LoginException;
}
