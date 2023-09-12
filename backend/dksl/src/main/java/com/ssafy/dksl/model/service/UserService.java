package com.ssafy.dksl.model.service;

import com.ssafy.dksl.model.dto.UserDto;
import com.ssafy.dksl.util.exception.RegisterException;
import org.springframework.stereotype.Service;

@Service
public interface UserService {
    public boolean registerUser(UserDto userDto) throws RegisterException;
}
