package com.personaltrainer.exception;

public class OperationNotPermitedException extends RuntimeException {

    public OperationNotPermitedException(String msg) {
        super(msg);
    }
}
