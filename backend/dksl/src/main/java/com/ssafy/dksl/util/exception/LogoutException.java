package com.ssafy.dksl.util.exception;

public class LogoutException extends Exception {
    public LogoutException() {
        super("로그아웃을 실패하였습니다.");
    }
    public LogoutException(String message) {
        super("로그아웃 오류 :: " + message);
    }
}
