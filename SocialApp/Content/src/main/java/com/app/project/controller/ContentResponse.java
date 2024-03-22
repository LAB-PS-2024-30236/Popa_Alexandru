package com.app.project.controller;

import com.app.project.model.User;
import lombok.*;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ContentResponse {
    private Long contentId;
    private User user;
    private String photo;
    private LocalDate datePosted;
    private String description;
}
