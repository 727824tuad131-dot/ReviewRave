package com.example.demo.entity;

import com.example.demo.enums.Status;

import jakarta.persistence.*;

@Entity
@Table(name = "resolution_tickets")
public class ResolutionTicket {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "review_id")
    private CustomerReview review;

    @ManyToOne
    @JoinColumn(name = "agent_id")
    private PlatformUser agent;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Status status;

    @Column(columnDefinition = "TEXT")
    private String resolutionNotes;

    public ResolutionTicket() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public CustomerReview getReview() {
        return review;
    }

    public void setReview(CustomerReview review) {
        this.review = review;
    }

    public PlatformUser getAgent() {
        return agent;
    }

    public void setAgent(PlatformUser agent) {
        this.agent = agent;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public String getResolutionNotes() {
        return resolutionNotes;
    }

    public void setResolutionNotes(String resolutionNotes) {
        this.resolutionNotes = resolutionNotes;
    }
}