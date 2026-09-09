// package com.example.demo.dto;

// import jakarta.validation.constraints.Email;
// import jakarta.validation.constraints.NotBlank;
// import jakarta.validation.constraints.Size;
// import lombok.*;

// @Data
// @Builder
// @AllArgsConstructor
// @NoArgsConstructor
// public class RegisterDto {

//     @NotBlank(message = "Email is required")
//     @Email(message = "Invalid email format")
//     private String email;

//     @NotBlank(message = "Password is required")
//     @Size(min = 8, message = "Password must be at least 8 characters")
//     private String password;

//     @NotBlank(message = "First name is required")
//     private String firstName;

//     @NotBlank(message = "Last name is required")
//     private String lastName;

//     private String companyName;

//     private String role; // Decoupled to String
// }

package com.example.demo.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RegisterDto {

    @NotBlank(message = "Email is required")
    @Email(message = "Email must be valid")
    private String email;

    @NotBlank(message = "Password is required")
    private String password;

    @NotBlank(message = "Full name is required")
    private String fullName;

    @NotBlank(message = "Organization is required")
    private String organization;
}