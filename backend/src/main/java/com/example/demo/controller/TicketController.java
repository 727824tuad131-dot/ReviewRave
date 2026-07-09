package com.example.demo.controller;

import com.example.demo.dto.ResolutionDto;
import com.example.demo.dto.TicketResponseDto;
import com.example.demo.entity.PlatformUser;
import com.example.demo.entity.ResolutionTicket;
import com.example.demo.repository.PlatformUserRepository;
import com.example.demo.repository.ResolutionTicketRepository;
import com.example.demo.repository.TrackedProductRepository;
import com.example.demo.service.TicketResolutionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/tickets")
@RequiredArgsConstructor
public class TicketController {

    private final TicketResolutionService ticketService;
    private final PlatformUserRepository userRepository;
    private final TrackedProductRepository productRepository;
    private final ResolutionTicketRepository ticketRepository;

    @PostMapping("/insight/{insightId}")
    @PreAuthorize("hasRole('BRAND_MANAGER') or hasRole('PLATFORM_ADMIN')")
    public ResponseEntity<Void> createManualTicket(@PathVariable Long insightId) {
        ticketService.createManualTicket(insightId);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping
    @PreAuthorize("hasRole('RESOLUTION_AGENT')")
    public ResponseEntity<List<TicketResponseDto>> getAgentTickets(@AuthenticationPrincipal PlatformUser agent) {
        List<TicketResponseDto> tickets = ticketService.getAgentTickets(agent.getId()).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(tickets);
    }

    @GetMapping("/open")
    @PreAuthorize("hasRole('PLATFORM_ADMIN') or hasRole('RESOLUTION_AGENT')")
    public ResponseEntity<List<TicketResponseDto>> getAllOpenTickets() {
        List<TicketResponseDto> tickets = ticketService.getAllOpenTickets().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(tickets);
    }

    @GetMapping("/stats")
    @PreAuthorize("hasRole('PLATFORM_ADMIN')")
    public ResponseEntity<Map<String, Object>> getTicketStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalUsers", userRepository.count());
        stats.put("totalProducts", productRepository.count());
        stats.put("openTickets", ticketRepository.findByTicketStatus(ResolutionTicket.TicketStatus.OPEN).size());
        return ResponseEntity.ok(stats);
    }

    @PutMapping("/{id}/assign")
    @PreAuthorize("hasRole('RESOLUTION_AGENT')")
    public ResponseEntity<Void> assignTicket(@PathVariable Long id, @AuthenticationPrincipal PlatformUser agent) {
        ticketService.assignTicket(id, agent.getId());
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}/resolve")
    @PreAuthorize("hasRole('RESOLUTION_AGENT')")
    public ResponseEntity<Void> resolveTicket(
            @PathVariable Long id, 
            @AuthenticationPrincipal PlatformUser agent, 
            @Valid @RequestBody ResolutionDto dto) {
        ticketService.resolveTicket(id, agent.getId(), dto);
        return ResponseEntity.ok().build();
    }

    private TicketResponseDto convertToDto(ResolutionTicket ticket) {
        return TicketResponseDto.builder()
                .id(ticket.getId())
                .priority(ticket.getPriority().name())
                .ticketStatus(ticket.getTicketStatus().name())
                .reviewContent(ticket.getInsight().getReview().getContent())
                .build();
    }
}