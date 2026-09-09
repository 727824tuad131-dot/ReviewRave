// package com.example.demo.event;

// import org.springframework.context.ApplicationEvent;

// public class TicketCreatedEvent extends ApplicationEvent {

//     private final Long ticketId;

//     /**
//      * Constructs a prototype Event.
//      *
//      * @param source   the object on which the Event initially occurred or with 
//      * which the Event is associated (typically 'this' in the publisher)
//      * @param ticketId the primary key reference identifier of the created ticket
//      */
//     public TicketCreatedEvent(Object source, Long ticketId) {
//         super(source);
//         this.ticketId = ticketId;
//     }

//     public Long getTicketId() {
//         return ticketId;
//     }
// }


package com.example.demo.event;

import com.example.demo.entity.CustomerReview;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ReviewIngestedEvent {

    private CustomerReview review;
}