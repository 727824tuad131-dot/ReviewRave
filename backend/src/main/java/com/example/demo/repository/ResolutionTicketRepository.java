package com.example.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.entity.ResolutionTicket;
import com.example.entity.Status;

public interface ResolutionTicketRepository extends JpaRepository<ResolutionTicket, Long> {

    List<ResolutionTicket> findByAgentId(Long agentId);

    List<ResolutionTicket> findByAgentIdAndStatus(Long agentId, Status status);

    long countByAgentIdAndStatus(Long agentId, Status status);
}