package com.example.demo.repository;

import com.example.demo.entity.ResolutionTicket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface ResolutionTicketRepository extends JpaRepository<ResolutionTicket, Long> {
    
    List<ResolutionTicket> findByAssigneeIdAndTicketStatusNot(Long assigneeId, com.example.demo.entity.ResolutionTicket.TicketStatus status);
    
    List<ResolutionTicket> findByAssigneeId(Long assigneeId);
    
    List<ResolutionTicket> findByTicketStatus(com.example.demo.entity.ResolutionTicket.TicketStatus status);
    
    List<ResolutionTicket> findByInsight_Review_Product_IdAndTicketStatus(Long productId, com.example.demo.entity.ResolutionTicket.TicketStatus status);
    
    Optional<ResolutionTicket> findByInsightId(Long insightId);
}