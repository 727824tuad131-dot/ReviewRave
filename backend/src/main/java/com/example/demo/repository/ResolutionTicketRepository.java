package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.ResolutionTicket;
import com.example.demo.entity.Status;

public interface ResolutionTicketRepository extends JpaRepository<ResolutionTicket, Long> {

    List<ResolutionTicket> findByAgentId(Long agentId);

    List<ResolutionTicket> findByAgentIdAndStatus(Long agentId, Status status);

    long countByAgentIdAndStatus(Long agentId, Status status);
}