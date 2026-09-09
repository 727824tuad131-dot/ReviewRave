// package com.example.demo.entity;

// import jakarta.persistence.*;
// import jakarta.validation.constraints.Email;
// import jakarta.validation.constraints.NotBlank;

// import java.util.Collection;
// import java.util.List;

// import org.springframework.security.core.GrantedAuthority;
// import org.springframework.security.core.authority.SimpleGrantedAuthority;
// import org.springframework.security.core.userdetails.UserDetails;

// @Entity
// @Table(name = "platform_users")
// public class PlatformUser implements UserDetails {

//     public enum Role {
//         USER, 
//         BRAND_MANAGER,
//         PLATFORM_ADMIN
//     }

//     @Id
//     @GeneratedValue(strategy = GenerationType.IDENTITY)
//     private Long id;

//     @NotBlank
//     @Column(unique = true)
//     private String username;

//     @NotBlank
//     private String password;

//     @Email
//     @Column(unique = true)
//     private String email;

//     @Enumerated(EnumType.STRING)
//     private Role role = Role.USER;

//     private Boolean isActive = true;

//     public PlatformUser() {
//     }

//     public PlatformUser(Long id, String username, String password, String email, Role role, Boolean isActive) {
//         this.id = id;
//         this.username = username;
//         this.password = password;
//         this.email = email;
//         this.role = role;
//         this.isActive = isActive;
//     }

//     public Long getId() {
//         return id;
//     }

//     public void setId(Long id) {
//         this.id = id;
//     }

//     @Override
//     public String getUsername() {
//         return username;
//     }

//     public void setUsername(String username) {
//         this.username = username;
//     }

//     @Override
//     public String getPassword() {
//         return password;
//     }

//     public void setPassword(String password) {
//         this.password = password;
//     }

//     public String getEmail() {
//         return email;
//     }

//     public void setEmail(String email) {
//         this.email = email;
//     }

//     public Role getRole() {
//         return role;
//     }

//     public void setRole(Role role) {
//         this.role = role;
//     }

//     public Boolean getIsActive() {
//         return isActive;
//     }

//     public void setIsActive(Boolean isActive) {
//         this.isActive = isActive;
//     }

//     @Override
//     public Collection<? extends GrantedAuthority> getAuthorities() {
//         return List.of(new SimpleGrantedAuthority("ROLE_" + role.name()));
//     }

//     @Override
//     public boolean isAccountNonExpired() {
//         return true;
//     }

//     @Override
//     public boolean isAccountNonLocked() {
//         return true;
//     }

//     @Override
//     public boolean isCredentialsNonExpired() {
//         return true;
//     }

//     @Override
//     public boolean isEnabled() {
//         return Boolean.TRUE.equals(isActive);
//     }
// }
// package com.example.demo.entity;

// import jakarta.persistence.*;
// import jakarta.validation.constraints.Email;
// import jakarta.validation.constraints.NotBlank;

// import java.util.Collection;
// import java.util.List;

// import org.springframework.security.core.GrantedAuthority;
// import org.springframework.security.core.authority.SimpleGrantedAuthority;
// import org.springframework.security.core.userdetails.UserDetails;

// @Entity
// @Table(name = "platform_users")
// public class PlatformUser implements UserDetails {

//     public enum Role {
//         USER,
//         BRAND_MANAGER,
//         RESOLUTION_AGENT,
//         PLATFORM_ADMIN
//     }

//     @Id
//     @GeneratedValue(strategy = GenerationType.IDENTITY)
//     private Long id;

//     @NotBlank
//     @Column(unique = true)
//     private String username;

//     @NotBlank
//     private String password;

//     @Email
//     @Column(unique = true)
//     private String email;

//     @Enumerated(EnumType.STRING)
//     private Role role = Role.USER;

//     private Boolean isActive = true;

//     public PlatformUser() {
//     }

//     public PlatformUser(
//             Long id,
//             String username,
//             String password,
//             String email,
//             Role role,
//             Boolean isActive) {

//         this.id = id;
//         this.username = username;
//         this.password = password;
//         this.email = email;
//         this.role = role;
//         this.isActive = isActive;
//     }

//     public Long getId() {
//         return id;
//     }

//     public void setId(Long id) {
//         this.id = id;
//     }

//     @Override
//     public String getUsername() {
//         return username;
//     }

//     public void setUsername(String username) {
//         this.username = username;
//     }

//     @Override
//     public String getPassword() {
//         return password;
//     }

//     public void setPassword(String password) {
//         this.password = password;
//     }

//     public String getEmail() {
//         return email;
//     }

//     public void setEmail(String email) {
//         this.email = email;
//     }

//     public Role getRole() {
//         return role;
//     }

//     public void setRole(Role role) {
//         this.role = role;
//     }

//     public Boolean getIsActive() {
//         return isActive;
//     }

//     public void setIsActive(Boolean isActive) {
//         this.isActive = isActive;
//     }

//     @Override
//     public Collection<? extends GrantedAuthority> getAuthorities() {
//         return List.of(
//                 new SimpleGrantedAuthority("ROLE_" + role.name())
//         );
//     }

//     @Override
//     public boolean isAccountNonExpired() {
//         return true;
//     }

//     @Override
//     public boolean isAccountNonLocked() {
//         return true;
//     }

//     @Override
//     public boolean isCredentialsNonExpired() {
//         return true;
//     }

//     @Override
//     public boolean isEnabled() {
//         return Boolean.TRUE.equals(isActive);
//     }
// }



package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Entity
@Table(name = "platform_users")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PlatformUser implements UserDetails {

    public enum Role {
        BRAND_MANAGER,
        RESOLUTION_AGENT,
        PLATFORM_ADMIN
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("ROLE_" + role.name()));
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}