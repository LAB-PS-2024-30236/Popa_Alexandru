package com.app.project.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class User {
    private Long userId;
    private String username;
    private String password;
    private String email;
    private Boolean status;
    private String firstName;
    private String lastName;
    private String bio;
    private LocalDate birthdate;
    private String phoneNumber;
    private String language;
    private Boolean isPrivate;
    private String profilePicture;
    private String role;
}