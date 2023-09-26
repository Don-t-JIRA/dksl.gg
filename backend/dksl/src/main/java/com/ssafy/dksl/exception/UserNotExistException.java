package com.ssafy.dksl.exception;

public class UserNotExistException extends Exception{
    public UserNotExistException() {
    }

    public UserNotExistException(String message) {
        super(message);
    }
}
