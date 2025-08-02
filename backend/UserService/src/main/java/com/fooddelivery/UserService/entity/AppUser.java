package com.fooddelivery.UserService.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Data
public class AppUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String keycloakId; // From jwt.getSubject()

    @Column(nullable = false)
    private String role; // CUSTOMER, RESTAURANT_OWNER, etc.

    private String name;
    private String email;
    private String phone;

    private LocalDateTime createdAt = LocalDateTime.now();
}
