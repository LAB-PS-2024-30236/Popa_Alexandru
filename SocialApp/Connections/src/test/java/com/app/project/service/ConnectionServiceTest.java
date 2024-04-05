package com.app.project.service;

import com.app.project.model.Connection;
import com.app.project.model.User;
import com.app.project.repository.ConnectionRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

class ConnectionServiceTest {

    @Mock
    private ConnectionRepository connectionRepository;

    @Mock
    private WebClient webClient;

    @Mock
    private WebClient.RequestHeadersUriSpec requestHeadersUriSpec;

    @Mock
    private WebClient.RequestHeadersSpec requestHeadersSpec;

    @InjectMocks
    private ConnectionService connectionService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        when(webClient.get()).thenReturn(requestHeadersUriSpec);
        when(requestHeadersUriSpec.uri(anyString())).thenReturn(requestHeadersSpec);
        when(requestHeadersSpec.header(anyString(), anyString())).thenReturn(requestHeadersSpec);
        when(requestHeadersSpec.accept(any())).thenReturn(requestHeadersSpec);
        when(requestHeadersSpec.exchangeToMono(any())).thenReturn(Mono.just(new User()));
    }

    @Test
    void getConnectionTypeTest() {

        when(connectionRepository.findByUserId(1L)).thenReturn(Optional.of(new Connection(1L, Collections.singletonList(2L), Collections.emptyList())));
        when(connectionRepository.findByUserId(2L)).thenReturn(Optional.of(new Connection(2L, Collections.singletonList(1L), Collections.emptyList())));

        String connectionType = connectionService.getConnectionType(1L, 2L);
        assertEquals("Follow", connectionType);

        connectionType = connectionService.getConnectionType(1L, 3L);
        assertEquals("Follow", connectionType);
    }

    @Test
    void addUserTest() {
        connectionService.addUser(1L, Arrays.asList(2L), Arrays.asList(3L));
        verify(connectionRepository).save(any(Connection.class));
    }


}
