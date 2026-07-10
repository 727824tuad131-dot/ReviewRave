package com.example.demo.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResolutionDto {
    private String resolutionNotes; // Fixes: getResolutionNotes() visibility issue
}