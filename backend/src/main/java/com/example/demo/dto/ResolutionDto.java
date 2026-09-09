// package com.example.demo.dto;

// import lombok.*;

// @Data
// @NoArgsConstructor
// @AllArgsConstructor
// public class ResolutionDto {
//     private String resolutionNotes; // Fixes: getResolutionNotes() visibility issue
// }

package com.example.demo.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ResolutionDto {

    @NotBlank(message = "Resolution notes are required")
    private String notes;
}