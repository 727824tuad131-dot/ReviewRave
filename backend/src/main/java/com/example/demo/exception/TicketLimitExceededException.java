// package com.example.demo.exception;

// public class TicketLimitExceededException extends RuntimeException {

//     public TicketLimitExceededException(String message) {
//         super(message);
//     }
// }


package com.example.demo.exception;

public class TicketLimitExceededException extends RuntimeException {

    private static final String DEFAULT_MESSAGE = "Maximum of 3 pending tickets allowed. Please complete or cancel existing ones.";

    public TicketLimitExceededException() {
        super(DEFAULT_MESSAGE);
    }

    public TicketLimitExceededException(String message) {
        super(message);
    }
}