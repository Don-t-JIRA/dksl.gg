package com.ssafy.dksl.util.exception;

public class InvalidTokenException extends Exception{
    public InvalidTokenException() {
        super("토큰에 대한 오류가 있습니다.");
    }
    public InvalidTokenException(String message) {
        super("토큰 인증 오류 (" + message + ")");
    }
}
