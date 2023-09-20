package com.ssafy.dksl.model.service;

import com.ssafy.dksl.model.dto.UserDto;
import com.ssafy.dksl.util.exception.RegisterException;
import com.ssafy.dksl.util.exception.UpdateUserException;
import org.springframework.stereotype.Service;

import javax.security.auth.login.LoginException;
import java.util.Map;

@Service
public interface UserService {
    boolean register(UserDto userDto) throws RegisterException;
    UserDto login(UserDto userDto) throws LoginException;
    boolean updateUser(String token, UserDto userDto) throws UpdateUserException;
}
