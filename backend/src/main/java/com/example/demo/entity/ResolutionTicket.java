// package com.example.demo.entity;

// import jakarta.persistence.*;
// import lombok.*;

// @Entity
// @Table(name = "resolution_tickets")
// @Getter
// @Setter
// @Builder
// @NoArgsConstructor
// @AllArgsConstructor
// public class ResolutionTicket {

//     public enum TicketStatus {
//         OPEN,
//         INVESTIGATING,
//         IN_PROGRESS,
//         RESOLVED
//     }

//     public enum TicketPriority {
//         LOW,
//         MEDIUM,
//         HIGH,
//         CRITICAL
//     }

//     @Id
//     @GeneratedValue(strategy = GenerationType.IDENTITY)
//     private Long id;


//     @Enumerated(EnumType.STRING)
//     private TicketStatus ticketStatus;


//     @Enumerated(EnumType.STRING)
//     private TicketPriority priority;


//     @ManyToOne
//     @JoinColumn(name = "assignee_id")
//     private PlatformUser assignee;


//     @OneToOne
//     @JoinColumn(name = "insight_id")
//     private SentimentInsight insight;


//     private String resolutionNotes;
// }



package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "resolution_tickets")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ResolutionTicket {

    public enum Status {
        PENDING,
        IN_PROGRESS,
        RESOLVED
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "review_id", nullable = false)
    private CustomerReview review;

    @ManyToOne
    @JoinColumn(name = "agent_id")
    private PlatformUser agent;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Status status;

    @Column(name = "resolution_notes", columnDefinition = "TEXT")
    private String resolutionNotes;
}