package com.example.demo.event;

public class TicketResolvedEvent {

    private final Long ticketId;

    public TicketResolvedEvent(Long ticketId) {
        this.ticketId = ticketId;
    }

    public Long getTicketId() {
        return ticketId;
    }
}