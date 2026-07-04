package com.example.demo.repository;

import com.example.demo.entity.ResolutionTicket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ResolutionTicketRepository extends JpaRepository<ResolutionTicket, Long> {

    List<ResolutionTicket> findByStatus(String status);

    List<ResolutionTicket> findByAssignedTo(String assignedTo);

    List<ResolutionTicket> findByPriority(String priority);
}