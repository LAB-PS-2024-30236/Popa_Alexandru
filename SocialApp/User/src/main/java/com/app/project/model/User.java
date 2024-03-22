package com.app.project.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "\"user\"")
@Entity
public class User {
    @Column(name = "user_id")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    @Column(unique = true)
    @NonNull
    private String username;

    @NonNull
    private String password;

    @Column(unique = true)
    @NonNull
    private String email;

    private Boolean status;
    private String firstName;
    private String lastName;
    private String bio;

    @NonNull
    private LocalDate birthdate;

    @Column(unique = true)
    @NonNull
    private String phoneNumber;


    private String language = "EN";
    private Boolean isPrivate = Boolean.TRUE;

    private String profilePicture;

    private String role;
}