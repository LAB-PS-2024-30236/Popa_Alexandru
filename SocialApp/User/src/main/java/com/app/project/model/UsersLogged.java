package com.app.project.model;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;

import java.sql.Timestamp;
import java.util.Date;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class UsersLogged {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long usersLoggedId;

    Long userId;
    Timestamp timeWhenLogged;
}
