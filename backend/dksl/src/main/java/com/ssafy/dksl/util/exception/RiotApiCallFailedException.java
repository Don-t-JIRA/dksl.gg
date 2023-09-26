package com.ssafy.dksl.util.exception;

import org.springframework.http.HttpStatus;

public class RiotApiCallFailedException extends CustomException {
    private final HttpStatus httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
    public RiotApiCallFailedException() {
        super("Riot API 호출을 실패했습니다..");
    }

    @Override
    public HttpStatus getHttpStatus() { return this.httpStatus; }
}