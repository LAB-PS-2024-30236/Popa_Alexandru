package com.app.project.controller;

import lombok.*;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class UserRegisterRequest {
    private String username;
    private String password;
    private String email;
    private String fullName;
    private LocalDate birthdate;
    private String phoneNumber;
}
