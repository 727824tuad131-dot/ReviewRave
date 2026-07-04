package com.example.demo.service;

import com.example.demo.entity.ResolutionTicket;
import com.example.demo.repository.ResolutionTicketRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TicketResolutionService {

    @Autowired
    private ResolutionTicketRepository resolutionTicketRepository;

    // Create Ticket
    public ResolutionTicket createTicket(ResolutionTicket ticket) {
        return resolutionTicketRepository.save(ticket);
    }

    // Get All Tickets
    public List<ResolutionTicket> getAllTickets() {
        return resolutionTicketRepository.findAll();
    }

    // Get Ticket By Id
    public ResolutionTicket getTicketById(Long id) {
        return resolutionTicketRepository.findById(id)
                .orElseThrow(() ->
                        new EntityNotFoundException("Ticket not found with id: " + id));
    }

    // Update Ticket
    public ResolutionTicket updateTicket(Long id, ResolutionTicket ticket) {

        if (!resolutionTicketRepository.existsById(id)) {
            throw new EntityNotFoundException("Ticket not found with id: " + id);
        }

        ticket.setId(id);   // Requires setId(Long) in ResolutionTicket
        return resolutionTicketRepository.save(ticket);
    }

    // Delete Ticket
    public void deleteTicket(Long id) {

        if (!resolutionTicketRepository.existsById(id)) {
            throw new EntityNotFoundException("Ticket not found with id: " + id);
        }

        resolutionTicketRepository.deleteById(id);
    }
}