package com.app.project.service;

import com.app.project.controller.StoryResponse;
import com.app.project.model.Story;
import com.app.project.model.User;
import com.app.project.repository.StoryRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.when;

class StoryServiceTest {

    @Mock
    private WebClient webClient;

    @Mock
    private WebClient.RequestHeadersUriSpec requestHeadersUriSpec;

    @Mock
    private WebClient.RequestHeadersSpec requestHeadersSpec;

    @Mock
    private StoryRepository storyRepository;

    @InjectMocks
    private StoryService storyService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        // Mocking WebClient for getUser and getUserFriends
        when(webClient.get()).thenReturn(requestHeadersUriSpec);
        when(requestHeadersUriSpec.uri(anyString())).thenReturn(requestHeadersSpec);
        when(requestHeadersSpec.header(anyString(), anyString())).thenReturn(requestHeadersSpec);
        when(requestHeadersSpec.accept(any())).thenReturn(requestHeadersSpec);

        // Mocking user retrieval
        when(requestHeadersSpec.exchangeToMono(any())).thenReturn(Mono.just(new User()));

        // Mocking friends' IDs retrieval
        when(requestHeadersSpec.exchangeToFlux(any())).thenReturn(Flux.just(2L, 3L));
    }

    @Test
    void getStoriesTest() {
        Story sampleStory = new Story(1L, 2L, "photo.jpg", LocalDate.now());
        when(storyRepository.findByUserId(anyLong())).thenReturn(Arrays.asList(sampleStory));

        List<StoryResponse> storyResponses = storyService.getStories(1L).collectList().block();

        assertNotNull(storyResponses);
        assertFalse(storyResponses.isEmpty());
        assertTrue(storyResponses.stream().anyMatch(response -> "photo.jpg".equals(response.getPhoto())));
    }

    @Test
    void getRandomStoriesTest() {
        Story randomStory = new Story(2L, 3L, "random.jpg", LocalDate.now());
        when(storyRepository.findByUserId(anyLong())).thenReturn(Arrays.asList(randomStory));

        // Note: The implementation of generateRandomIds needs correction as it incorrectly casts a List to Flux.
        // This correction should ensure generateRandomIds correctly returns a Flux<Long>.
        List<StoryResponse> storyResponses = storyService.getRandomStories().collectList().block();

        assertNotNull(storyResponses);
        assertFalse(storyResponses.isEmpty());
        assertTrue(storyResponses.stream().anyMatch(response -> "random.jpg".equals(response.getPhoto())));
    }

}
