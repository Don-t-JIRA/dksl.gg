package com.ssafy.dksl.model.service;

import com.ssafy.dksl.model.dto.UserDto;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {
    public boolean registerUser(UserDto userDto) {

        System.out.println("===== To Create User Dto : =====");
        System.out.println(userDto + "\n");
        return true;
    }
}
