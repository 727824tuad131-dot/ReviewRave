package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "resolution_tickets")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ResolutionTicket {

    public enum TicketStatus {
        OPEN, IN_PROGRESS, RESOLVED
    }

    public enum TicketPriority {
        LOW, MEDIUM, HIGH, CRITICAL
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private TicketStatus ticketStatus;

    @Enumerated(EnumType.STRING)
    private TicketPriority ticketPriority;

    @ManyToOne
    @JoinColumn(name = "assignee_id")
    private PlatformUser assignee;

    @OneToOne
    @JoinColumn(name = "insight_id")
    private SentimentInsight insight;

    private String resolutionNotes;
}