package com.example.demo.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TicketResponseDto {

    private Long ticketId;
    private Long reviewId;
    private Long productId;
    private String title;
    private String description;
    private String status;
    private String priority;
    private Long assignedAgentId;
    private String assignedAgentName;
    private String resolutionNotes;
    private String createdAt;
    private String updatedAt;
}