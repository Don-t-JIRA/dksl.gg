package com.ssafy.dksl.controller;

import com.ssafy.dksl.model.dto.UserDto;
import com.ssafy.dksl.model.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("user")
public class UserController {

    private UserService userService;

    @Autowired
    private UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("create")
    private ResponseEntity<?> createUser(@RequestBody UserDto userDto) {
        System.out.println(userDto);
        return ResponseEntity.ok(userDto);
    }
}
