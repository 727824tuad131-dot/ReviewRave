// package com.example.demo.event;

// public class TicketResolvedEvent {

//     private final Long ticketId;

//     public TicketResolvedEvent(Long ticketId) {
//         this.ticketId = ticketId;
//     }

//     public Long getTicketId() {
//         return ticketId;
//     }
// }


package com.example.demo.event;

import com.example.demo.entity.ResolutionTicket;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class TicketResolvedEvent {

    private ResolutionTicket ticket;
}