package com.example.demo.repository;

import com.example.demo.entity.ResolutionTicket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface ResolutionTicketRepository extends JpaRepository<ResolutionTicket, Long> {
    
    @Query("SELECT t FROM ResolutionTicket t WHERE t.assignee.id = :assigneeId AND t.ticketStatus <> :status")
    List<ResolutionTicket> findByAssigneeIdAndTicketStatusNot(@Param("assigneeId") Long assigneeId, @Param("status") Object status);
    
    List<ResolutionTicket> findByAssigneeId(Long assigneeId);
    
    @Query("SELECT t FROM ResolutionTicket t WHERE t.ticketStatus = :status")
    List<ResolutionTicket> findByTicketStatus(@Param("status") Object status);
    
    @Query("SELECT t FROM ResolutionTicket t WHERE t.insight.review.product.id = :productId AND t.ticketStatus = :status")
    List<ResolutionTicket> findByInsight_Review_Product_IdAndTicketStatus(@Param("productId") Long productId, @Param("status") Object status);
    
    Optional<ResolutionTicket> findByInsightId(Long insightId);
}