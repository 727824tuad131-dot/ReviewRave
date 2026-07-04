package com.example.demo.exception;

public class TicketLimitExceededException extends RuntimeException {

    public TicketLimitExceededException(String message) {
        super(message);
    }
}