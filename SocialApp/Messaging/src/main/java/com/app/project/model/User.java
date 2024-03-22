package com.app.project.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class User {
    private Long userId;
    @NonNull
    private String username;
    @NonNull
    private String password;
    @NonNull
    private String email;
    private Boolean status;
    private String firstName;
    private String lastName;
    private String bio;
    @NonNull
    private LocalDate birthdate;
    @NonNull
    private String phoneNumber;
    private String language;
    private Boolean isPrivate;
    private String profilePicture;
}