package com.ssafy.dksl.util.exception;

public class RegisterException extends Exception {
    public RegisterException() {
        super("회원가입을 실패하였습니다.");
    }
    public RegisterException(String message) {
        super(message);
    }
}
