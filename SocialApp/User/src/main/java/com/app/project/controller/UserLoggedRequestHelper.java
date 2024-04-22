package com.app.project.controller;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserLoggedRequestHelper {
    String profilePhoto;
    String username;
    String name;
    Timestamp timeWhenLogged;
    Long userId;
}
