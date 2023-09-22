package com.ssafy.dksl.util.exception;

public class UpdateDataException extends Exception {
    public UpdateDataException() {
        super("데이터 수정을 실패하였습니다.");
    }
    public UpdateDataException(String message) {
        super("데이터 수정 실패 오류 : " + message);
    }
}
