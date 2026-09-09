// package com.example.demo.event;

// public class ReviewIngestedEvent {

//     private final Long reviewId;

//     public ReviewIngestedEvent(Long reviewId) {
//         this.reviewId = reviewId;
//     }

//     public Long getReviewId() {
//         return reviewId;
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