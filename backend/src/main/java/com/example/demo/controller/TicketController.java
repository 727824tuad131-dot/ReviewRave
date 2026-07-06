package com.example.demo.controller;

import com.example.demo.entity.ResolutionTicket;
import com.example.demo.service.TicketResolutionService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
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
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ResolutionTicket> createTicket(
            @Valid @RequestBody ResolutionTicket ticket) {

        return ResponseEntity.ok(ticketResolutionService.createTicket(ticket));
    }

    // Get All Tickets
    @GetMapping
    public ResponseEntity<List<ResolutionTicket>> getAllTickets() {

        return ResponseEntity.ok(ticketResolutionService.getAllTickets());
    }

    // Get Ticket By Id
    @GetMapping("/{id}")
    public ResponseEntity<ResolutionTicket> getTicketById(@PathVariable Long id) {

        return ResponseEntity.ok(ticketResolutionService.getTicketById(id));
    }

    // Update Ticket
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ResolutionTicket> updateTicket(
            @PathVariable Long id,
            @Valid @RequestBody ResolutionTicket ticket) {

        return ResponseEntity.ok(
                ticketResolutionService.updateTicket(id, ticket));
    }

    // Delete Ticket
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> deleteTicket(@PathVariable Long id) {

        ticketResolutionService.deleteTicket(id);
        return ResponseEntity.ok("Ticket deleted successfully");
    }
}