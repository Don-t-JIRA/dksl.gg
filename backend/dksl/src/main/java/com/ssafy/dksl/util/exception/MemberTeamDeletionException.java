package com.ssafy.dksl.util.exception;

import org.springframework.http.HttpStatus;

public class MemberTeamDeletionException extends CustomException {
    private final HttpStatus httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;

    @Override
    public HttpStatus getHttpStatus() { return this.httpStatus; }
    public MemberTeamDeletionException() { super("팀을 탈퇴할 수 없습니다."); }
}
