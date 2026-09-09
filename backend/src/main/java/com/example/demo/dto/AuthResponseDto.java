// package com.example.demo.dto;

// import lombok.*;

// @Data
// @Builder
// @AllArgsConstructor
// @NoArgsConstructor
// public class AuthResponseDto {
//     private String token;
//     private String role;
//     private Long userId;
// }


package com.example.demo.dto;

import com.example.demo.entity.PlatformUser.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponseDto {

    private String token;
    private String email;
    private Role role;
}