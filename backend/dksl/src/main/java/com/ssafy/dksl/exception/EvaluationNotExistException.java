package com.ssafy.dksl.exception;

public class EvaluationNotExistException extends Exception{
    public EvaluationNotExistException() {
    }

    public EvaluationNotExistException(String message) {
        super(message);
    }
}
