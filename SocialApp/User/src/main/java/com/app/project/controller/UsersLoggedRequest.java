package com.app.project.controller;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UsersLoggedRequest {
    int totalNumberOfLoggedUsers;
    List<UserLoggedRequestHelper> userLoggedRequestHelper;
}
