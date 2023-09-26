package com.ssafy.dksl.util.exception;

public class GetDataException extends Exception {
    public GetDataException() {
        super("데이터 조회를 실패하였습니다.");
    }
    public GetDataException(String message) {
        super("데이터 조회 실패 오류 (" + message + ")");
    }
}
