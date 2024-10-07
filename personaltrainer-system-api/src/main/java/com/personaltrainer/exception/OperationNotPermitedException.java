package com.personaltrainer.exception;

public class OperationNotPermitedException extends RuntimeException {

    public OperationNotPermitedException() {
        super("This client is not on your list of clients");
    }
}
