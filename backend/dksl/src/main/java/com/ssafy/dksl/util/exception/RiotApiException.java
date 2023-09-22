package com.ssafy.dksl.util.exception;

public class RiotApiException extends Exception {
    public RiotApiException() {
        super("라이엇 API를 불러올 수 없습니다.");
    }
    public RiotApiException(String message) {
        super("라이엇 API 오류 (" + message + ")");
    }
}
