package com.app.project.controller;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ReadStatusUpdate {
    private Long messageId;
    private Boolean isRead;
    private Long updatedByUserId;
}