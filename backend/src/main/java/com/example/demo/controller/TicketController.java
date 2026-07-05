package com.example.demo.controller;

import com.example.demo.entity.ResolutionTicket;
import com.example.demo.service.TicketResolutionService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tickets")
@CrossOrigin(origins = "*")
public class TicketController {

    @Autowired
    private TicketResolutionService ticketResolutionService;

    // Create Ticket
    @PostMapping
    public ResolutionTicket createTicket(@Valid @RequestBody ResolutionTicket ticket) {
        return ticketResolutionService.createTicket(ticket);
    }

    // Get All Tickets
    @GetMapping
    public List<ResolutionTicket> getAllTickets() {
        return ticketResolutionService.getAllTickets();
    }

    // Get Ticket By Id
    @GetMapping("/{id}")
    public ResolutionTicket getTicketById(@PathVariable Long id) {
        return ticketResolutionService.getTicketById(id);
    }

    // Update Ticket
    @PutMapping("/{id}")
    public ResolutionTicket updateTicket(@PathVariable Long id,
                                         @Valid @RequestBody ResolutionTicket ticket) {
        return ticketResolutionService.updateTicket(id, ticket);
    }

    // Delete Ticket
    @DeleteMapping("/{id}")
    public String deleteTicket(@PathVariable Long id) {
        ticketResolutionService.deleteTicket(id);
        return "Ticket deleted successfully";
    }
}