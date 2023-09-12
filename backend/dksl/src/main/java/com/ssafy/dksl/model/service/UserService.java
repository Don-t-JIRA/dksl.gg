package com.ssafy.dksl.model.service;

import com.ssafy.dksl.model.dto.UserDto;
import org.springframework.stereotype.Service;

@Service
public interface UserService {
    public boolean registerUser(UserDto userDto);
}
