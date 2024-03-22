package com.app.project.model;


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

    @NonNull
    private Boolean status;

    private String firstName;

    private String lastName;

    private String bio;

    @NonNull
    private LocalDate birthdate;

    private String phoneNumber;

    @NonNull
    private String language;

    @NonNull
    private Boolean isPrivate;

    private String profilePicture;
}