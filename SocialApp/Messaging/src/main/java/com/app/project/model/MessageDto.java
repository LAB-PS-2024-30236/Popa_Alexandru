package com.app.project.model;


import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class MessageDto {
    private Long messageId;
    private User senderId;
    private User receiverId;
    private String content;
    private LocalDateTime timestamp;
    private Boolean isRead;
    private Boolean IsEdited;
}
