// package com.example.demo.dto;

// import lombok.*;

// @Data
// @Builder
// @AllArgsConstructor
// @NoArgsConstructor
// public class TicketResponseDto {
//     private Long id;
//     private String priority;
//     private String ticketStatus;
//     private String reviewContent;
// }

package com.example.demo.dto;

import com.example.demo.entity.ResolutionTicket;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TicketResponseDto {

    private Long id;
    private Long reviewId;
    private String reviewContent;
    private Long productId;
    private String productName;
    private Long agentId;
    private String agentEmail;
    private ResolutionTicket.Status status;
    private String resolutionNotes;
}