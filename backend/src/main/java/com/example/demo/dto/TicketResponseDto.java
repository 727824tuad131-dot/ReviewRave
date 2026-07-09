package com.example.demo.dto;

import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TicketResponseDto {
    private Long id;
    private String priority;
    private String ticketStatus;
    private String reviewContent;
}