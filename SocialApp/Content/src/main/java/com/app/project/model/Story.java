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
public class Story {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long storyId;
    @NonNull
    private Long userId;
    @NonNull
    private String photo;
    @NonNull
    private LocalDate datePosted;
}
