package com.ssafy.dksl.exception;

public class NonExistReviewException extends Exception {
    public NonExistReviewException() {
    }

    public NonExistReviewException(String message) {
        super(message);
    }
}
