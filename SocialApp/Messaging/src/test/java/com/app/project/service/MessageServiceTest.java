package com.app.project.service;
import com.app.project.model.Message;
import com.app.project.model.User;
import com.app.project.repository.MessageRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class MessageServiceTest {

    @Mock
    private MessageRepository messageRepository;

    @Mock
    private WebClient webClient;

    @Mock
    private WebClient.RequestHeadersUriSpec requestHeadersUriSpec;

    @Mock
    private WebClient.RequestHeadersSpec requestHeadersSpec;

    @Mock
    private WebClient.ResponseSpec responseSpec;

    @InjectMocks
    private MessageService messageService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        when(webClient.get()).thenReturn(requestHeadersUriSpec);
        when(requestHeadersUriSpec.uri(any(String.class))).thenReturn(requestHeadersSpec);
        when(requestHeadersSpec.header(any(String.class), any(String.class))).thenReturn(requestHeadersSpec);
        when(requestHeadersSpec.accept(any())).thenReturn(requestHeadersSpec);
        when(requestHeadersSpec.exchangeToMono(any())).thenReturn(Mono.just(new User()));
    }

    @Test
    void getMessagesBetweenUsersTest() {
        Long senderId = 1L, receiverId = 2L;
        when(messageRepository.findBySenderIdAndReceiverId(senderId, receiverId)).thenReturn(Arrays.asList(new Message()));
        List<Message> result = messageService.getMessagesBetweenUsers(senderId, receiverId);
        assertNotNull(result);
        assertFalse(result.isEmpty());
        verify(messageRepository).findBySenderIdAndReceiverId(senderId, receiverId);
    }

    @Test
    void getUserIdsForMessageTest() {
        Long messageId = 1L;
        Message mockMessage = new Message();
        mockMessage.setSenderId(1L);
        mockMessage.setReceiverId(2L);
        when(messageRepository.findById(messageId)).thenReturn(Optional.of(mockMessage));
        Long[] userIds = messageService.getUserIdsForMessage(messageId);
        assertNotNull(userIds);
        assertArrayEquals(new Long[]{1L, 2L}, userIds);
    }

    @Test
    void updateMessageReadStatusTest() {
        Long messageId = 1L;
        Message mockMessage = new Message();
        mockMessage.setIsRead(false);
        when(messageRepository.findById(messageId)).thenReturn(Optional.of(mockMessage));
        when(messageRepository.save(any(Message.class))).thenAnswer(invocation -> invocation.getArgument(0));
        Message updatedMessage = messageService.updateMessageReadStatus(messageId, true);
        assertTrue(updatedMessage.getIsRead());
    }

    @Test
    void updateMessageContentTest() {
        Long messageId = 1L;
        String newContent = "Updated Content";
        Message mockMessage = new Message();
        mockMessage.setContent("Original Content");
        when(messageRepository.findById(messageId)).thenReturn(Optional.of(mockMessage));
        when(messageRepository.save(any(Message.class))).thenAnswer(invocation -> invocation.getArgument(0));
        Message updatedMessage = messageService.updateMessageContent(messageId, newContent);
        assertEquals(newContent, updatedMessage.getContent());
        assertTrue(updatedMessage.getIsEdited());
    }

    @Test
    void deleteMessageTest() {
        Long messageId = 1L;
        doNothing().when(messageRepository).deleteById(messageId);
        messageService.deleteMessage(messageId);
        verify(messageRepository).deleteById(messageId);
    }

    @Test
    void saveMessageTest() {
        Message message = new Message();
        message.setContent("Hello World");
        message.setSenderId(1L);
        message.setReceiverId(2L);
        when(messageRepository.save(any(Message.class))).thenAnswer(invocation -> invocation.getArgument(0));
        messageService.saveMessage(message);
        verify(messageRepository).save(any(Message.class));
    }

}