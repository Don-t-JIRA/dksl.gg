package com.ssafy.dksl.util.exception;

public class CreateDataException extends Exception {
    public CreateDataException() {
        super("데이터 생성을 실패하였습니다.");
    }
    public CreateDataException(String message) {
        super("데이터 생성 실패 오류 : " + message);
    }
}
