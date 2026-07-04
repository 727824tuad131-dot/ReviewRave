package com.example.demo.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResolutionDto {

    @NotBlank(message = "Resolution notes are required")
    @Size(min = 5, max = 1000, message = "Resolution notes must be between 5 and 1000 characters")
    private String notes;
}