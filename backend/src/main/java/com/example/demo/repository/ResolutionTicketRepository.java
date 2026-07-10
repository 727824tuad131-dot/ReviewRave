package com.example.demo.repository;

import com.example.demo.entity.ResolutionTicket;
import com.example.demo.entity.ResolutionTicket.TicketStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ResolutionTicketRepository extends JpaRepository<ResolutionTicket, Long> {

    // Fixes: cannot find symbol findByInsightReviewProductIdAndTicketStatus
    List<ResolutionTicket> findByInsightReviewProductIdAndTicketStatus(Long productId, TicketStatus ticketStatus);
}