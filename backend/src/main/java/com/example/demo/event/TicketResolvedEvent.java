package com.example.demo.event;

import org.springframework.context.ApplicationEvent;

public class TicketResolvedEvent extends ApplicationEvent {
    private final Long ticketId;

    public TicketResolvedEvent(Object source, Long ticketId) {
        super(source);
        this.ticketId = ticketId;
    }

    public Long getTicketId() {
        return this.ticketId;
    }
}