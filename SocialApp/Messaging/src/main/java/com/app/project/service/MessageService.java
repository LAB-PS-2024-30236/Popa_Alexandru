package com.app.project.service;

import com.app.project.model.Message;
import com.app.project.model.MessageDto;
import com.app.project.model.User;
import com.app.project.repository.MessageRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class MessageService {
    @Autowired
    private WebClient webClient;
    private final MessageRepository messageRepository;

    @Autowired
    public MessageService(MessageRepository messageRepository) {
        this.messageRepository = messageRepository;
    }

    public List<Message> getMessagesBetweenUsers(Long senderId, Long receiverId) {
        return messageRepository.findBySenderIdAndReceiverId(senderId, receiverId);
    }

    public Long[] getUserIdsForMessage(Long messageId) {
        // Assuming you have a method to retrieve a message by its ID
        Message message = messageRepository.findById(messageId).get();
        if (message != null) {
            return new Long[]{message.getSenderId(), message.getReceiverId()};
        }
        return new Long[0]; // Return an empty array if the message is not found
    }

    public Message updateMessageReadStatus(Long messageId, Boolean isRead) {
        Message message = messageRepository.findById(messageId)
                .orElseThrow(() -> new EntityNotFoundException("Message not found"));
        message.setIsRead(isRead);
        return messageRepository.save(message);
    }

    public Message updateMessageContent(Long messageId, String newContent) {
        Message message = messageRepository.findById(messageId)
                .orElseThrow(() -> new EntityNotFoundException("Message not found"));
        message.setContent(newContent);
        message.setIsEdited(true);
        return messageRepository.save(message);
    }

    public void deleteMessage(Long messageId) {
        messageRepository.deleteById(messageId);
    }

    public void saveMessage(Message message) {
        Message message1= new Message();
        message1.setIsEdited(false);
        message1.setSenderId(message.getSenderId());
        message1.setReceiverId(message.getReceiverId());
        message1.setIsRead(false);
        message1.setContent(message.getContent());
        message1.setTimestamp(LocalDateTime.now());
        messageRepository.save(message1);
    }

    public List<MessageDto> getPersonConversations(Long userId) {
        List<Message> receivedMessages = messageRepository.findByReceiverId(userId);
        List<Message> sendMessages = messageRepository.findBySenderId(userId);


        List<Message> combinedMessages = new ArrayList<>(receivedMessages);
        combinedMessages.addAll(sendMessages);

        LinkedHashMap<String, Message> lastMessagesMap = combinedMessages.stream()
                .collect(Collectors.toMap(
                        message -> createCompositeKey(message.getSenderId(), message.getReceiverId()),
                        message -> message,
                        (existing, replacement) -> existing.getTimestamp().isBefore(replacement.getTimestamp()) ? replacement : existing,
                        LinkedHashMap::new
                ));

        List<Message> lastMessages = new ArrayList<>(lastMessagesMap.values());
        lastMessages.sort(Comparator.comparing(Message::getTimestamp).reversed());

        return lastMessages.stream().map(message -> {
            MessageDto dto = new MessageDto();
            dto.setMessageId(message.getMessageId());
            dto.setSenderId(getUser(message.getSenderId()));
            dto.setReceiverId(getUser(message.getReceiverId()));
            dto.setContent(message.getContent());
            dto.setTimestamp(message.getTimestamp());
            dto.setIsRead(message.getIsRead());
            dto.setIsEdited(message.getIsEdited());
            return dto;
        }).collect(Collectors.toList());
    }

    public List<Message> getPersonChat(Long receiverId, Long senderId) {
        List<Message> sendMessages = messageRepository.findBySenderIdAndReceiverId(senderId, receiverId);
        List<Message> receivedMessages = messageRepository.findBySenderIdAndReceiverId(receiverId, senderId);
        List<Message> combinedMessages = new ArrayList<>(receivedMessages);

        combinedMessages.addAll(sendMessages);

        combinedMessages.sort(Comparator.comparing(Message::getTimestamp));

        return combinedMessages;
    }

    private String createCompositeKey(Long senderId, Long receiverId) {
        return senderId < receiverId ? senderId + "_" + receiverId : receiverId + "_" + senderId;
    }


    private User getUser(@NonNull Long userId) {
        var webRequest = webClient
                .get()
                .uri("http://localhost:8080/api/user/getSession/" + userId)
                .header(HttpHeaders.AUTHORIZATION, "Bearer eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIyIiwiaWF0IjoxNjk5NDY1MDY1LCJzdWIiOiJocnViYW5hbmRyYWRhQGdtYWlsLmNvbSIsImlzcyI6InBvcGEmcm9iZXJ0IiwiZXhwIjoxNzAwNDY1MDY1fQ.yIRaCz1opmBzRtCTVjOBpb4bNf2O5h_BZikh4ArLgj4")
                .accept(MediaType.APPLICATION_JSON);

        return webRequest.exchangeToMono(response -> {
            if (response.statusCode() == HttpStatus.OK) {
                return response.bodyToMono(User.class);
            } else {
                return response.bodyToMono(String.class)
                        .flatMap(body -> Mono.error(new RuntimeException("Request failed:" + body)));
            }
        }).block();
    }

}
