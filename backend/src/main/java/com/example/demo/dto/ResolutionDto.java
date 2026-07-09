package com.example.demo.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResolutionDto {

    @NotBlank(message = "Resolution notes are required")
    private String notes; // Maps to resolution notes input field
}