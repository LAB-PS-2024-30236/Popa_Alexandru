package com.app.project.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table
@Entity
public class Content {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long contentId;

    @NonNull
    private Long userId;

    @NonNull
    private String photo;

    @NonNull
    private LocalDate datePosted;

    private String description;

    private int numberOfLikes = 0;
}