package com.ssafy.dksl.util.exception;

public class UpdateUserException extends Exception {
    public UpdateUserException() {
        super("회원정보 수정을 실패하였습니다.");
    }
    public UpdateUserException(String message) {
        super("회원정보 수정 오류 :: " + message);
    }
}
