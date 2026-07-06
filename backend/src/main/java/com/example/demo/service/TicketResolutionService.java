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

        ResolutionTicket existingTicket = resolutionTicketRepository.findById(id)
                .orElseThrow(() ->
                        new EntityNotFoundException("Ticket not found with id: " + id));

        existingTicket.setTitle(ticket.getTitle());
        existingTicket.setDescription(ticket.getDescription());
        existingTicket.setStatus(ticket.getStatus());
        existingTicket.setPriority(ticket.getPriority());
        existingTicket.setAssignedTo(ticket.getAssignedTo());

        return resolutionTicketRepository.save(existingTicket);
    }

    // Delete Ticket
    public void deleteTicket(Long id) {

        if (!resolutionTicketRepository.existsById(id)) {
            throw new EntityNotFoundException("Ticket not found with id: " + id);
        }

        resolutionTicketRepository.deleteById(id);
    }
}