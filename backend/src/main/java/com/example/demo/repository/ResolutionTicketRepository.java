package com.example.demo.repository;

import com.example.demo.entity.ResolutionTicket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ResolutionTicketRepository extends JpaRepository<ResolutionTicket, Long> {
    
    List<ResolutionTicket> findByAssigneeIdAndTicketStatusNot(Long assigneeId, ResolutionTicket.TicketStatus status);
    
    List<ResolutionTicket> findByAssigneeId(Long assigneeId);
    
    List<ResolutionTicket> findByTicketStatus(ResolutionTicket.TicketStatus status);
    
    // Fixed: Explicitly defining boundaries between properties using underscores
    List<ResolutionTicket> findByInsight_Review_Product_IdAndTicketStatus(Long productId, ResolutionTicket.TicketStatus status);
    
    Optional<ResolutionTicket> findByInsightId(Long insightId);
}