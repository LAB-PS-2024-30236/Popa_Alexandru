package com.app.project.controller;


import com.app.project.model.Message;
import com.app.project.model.MessageDto;
import com.app.project.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")

public class WebSocketController {

    private final MessageService messageService;
    private final SimpMessagingTemplate messagingTemplate;

    @Autowired
    public WebSocketController(MessageService messageService, SimpMessagingTemplate messagingTemplate) {
        this.messageService = messageService;
        this.messagingTemplate = messagingTemplate;
    }

    @MessageMapping("/sendMessage")
    @SendTo("/topic/messages")
    public void sendMessage(@Payload Message message) {
        messageService.saveMessage(message);
        messagingTemplate.convertAndSendToUser(message.getSenderId().toString(), "/queue/reply", message);
        messagingTemplate.convertAndSendToUser(message.getReceiverId().toString(), "/queue/reply", message);
    }

    @MessageMapping("/updateReadStatus")
    public void updateReadStatus(@Payload ReadStatusUpdate update) {
        messageService.updateMessageReadStatus(update.getMessageId(), update.getIsRead());
        Long[] userIds = messageService.getUserIdsForMessage(update.getMessageId());
        for (Long userId : userIds) {
            messagingTemplate.convertAndSendToUser(userId.toString(), "/queue/readStatus", update);
        }
    }

    @MessageMapping("/updateMessageContent")
    public void updateMessageContent(@Payload MessageContentUpdate update) {
        messageService.updateMessageContent(update.getMessageId(), update.getNewContent());
        Long[] userIds = messageService.getUserIdsForMessage(update.getMessageId());
        for (Long userId : userIds) {
            messagingTemplate.convertAndSendToUser(userId.toString(), "/queue/contentUpdate", update);
        }
    }

    @MessageMapping("/deleteMessage")
    public void deleteMessage(@Payload MessageDelete delete) {
        messageService.deleteMessage(delete.getMessageId());
        Long[] userIds = messageService.getUserIdsForMessage(delete.getMessageId());
        for (Long userId : userIds) {
            messagingTemplate.convertAndSendToUser(userId.toString(), "/queue/deleteMessage", delete);
        }
    }

    @GetMapping("/getPersonConversations/{userId}")
    public List<MessageDto> getPersonConversations(@PathVariable Long userId) {
        return messageService.getPersonConversations(userId);
    }

    @GetMapping("/getPersonChat/{userId1}/{userId2}")
    public List<Message>getPersonChat(@PathVariable Long userId1, @PathVariable Long userId2){
        return messageService.getPersonChat(userId1, userId2);
    }

}
