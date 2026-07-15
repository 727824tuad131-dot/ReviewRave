package com.example.demo.repository;

import com.example.demo.entity.ResolutionTicket;
import com.example.demo.entity.ResolutionTicket.TicketStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ResolutionTicketRepository extends JpaRepository<ResolutionTicket, Long> {

    // Find ticket linked with sentiment insight
    Optional<ResolutionTicket> findByInsightId(Long insightId);

    // Find tickets assigned to an agent
    List<ResolutionTicket> findByAssigneeId(Long assigneeId);

    // Find active tickets of an agent excluding a status
    List<ResolutionTicket> findByAssigneeIdAndTicketStatusNot(
            Long assigneeId,
            TicketStatus ticketStatus
    );

    // Find tickets by status
    List<ResolutionTicket> findByTicketStatus(TicketStatus ticketStatus);

    // Existing query support
    List<ResolutionTicket> findByInsightReviewProductIdAndTicketStatus(
            Long productId,
            TicketStatus ticketStatus
    );
}