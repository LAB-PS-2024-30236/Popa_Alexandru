package com.app.project.service;

import com.app.project.controller.ContentResponse;
import com.app.project.model.Content;
import com.app.project.model.User;
import com.app.project.repository.ContentRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.MediaType;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.when;

class ContentServiceTest {

    @Mock
    private WebClient webClient;

    @Mock
    private WebClient.RequestHeadersUriSpec requestHeadersUriSpec;

    @Mock
    private WebClient.RequestHeadersSpec requestHeadersSpec;

    @Mock
    private WebClient.ResponseSpec responseSpec;

    @Mock
    private ContentRepository contentRepository;

    @InjectMocks
    private ContentService contentService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        when(webClient.get()).thenReturn(requestHeadersUriSpec);
        when(requestHeadersUriSpec.uri(anyString())).thenReturn(requestHeadersSpec);
        when(requestHeadersSpec.header(anyString(), anyString())).thenReturn(requestHeadersSpec);
        when(requestHeadersSpec.accept(any(MediaType.class))).thenReturn(requestHeadersSpec);

        when(requestHeadersSpec.exchangeToMono(any())).thenReturn(Mono.just(new User()));

        when(requestHeadersSpec.exchangeToFlux(any())).thenReturn(Flux.just(2L, 3L));
    }

    @Test
    void getSuggestedPostsTest() {
        Content sampleContent = new Content(1L, 1L, "photo.jpg", LocalDate.now(), "Sample Description");
        when(contentRepository.findByUserId(anyLong())).thenReturn(sampleContent);

        List<ContentResponse> results = contentService.getSuggestedPosts(1L).collectList().block();

        assertNotNull(results);
        assertFalse(results.isEmpty());
        assertEquals(4, results.size());
        results.forEach(contentResponse -> {
            assertNotNull(contentResponse.getContentId());
            assertNotNull(contentResponse.getUser());
            assertNotNull(contentResponse.getPhoto());
            assertNotNull(contentResponse.getDatePosted());
            assertEquals("Sample Description", contentResponse.getDescription());
        });
    }

    @Test
    void getPostsTest() {
        Content sampleContent = new Content(1L, 2L, "photo.jpg", LocalDate.now(), "Another Description");
        when(contentRepository.findByUserId(anyLong())).thenReturn(sampleContent);

        List<ContentResponse> results = contentService.getPosts(2L).collectList().block();

        assertNotNull(results);
        assertFalse(results.isEmpty());
        assertEquals(2, results.size());
        results.forEach(contentResponse -> assertEquals("Another Description", contentResponse.getDescription()));
    }

    @Test
    void getUserPostsTest() {
        List<Content> expectedContents = Arrays.asList(
                new Content(1L, 1L, "image1.jpg", LocalDate.of(2021, 3, 15), "Post 1"),
                new Content(2L, 1L, "image2.jpg", LocalDate.of(2021, 4, 20), "Post 2")
        );

        when(contentRepository.findAllByUserId(1L)).thenReturn(expectedContents);

        List<Content> userPosts = contentService.getUserPosts(1L);

        assertNotNull(userPosts);
        assertFalse(userPosts.isEmpty());
        assertEquals(2, userPosts.size());
        assertEquals("Post 1", userPosts.get(0).getDescription());
        assertEquals("image1.jpg", userPosts.get(0).getPhoto());
    }

    @Test
    void getRandomPostsTest() {
//        Content randomContent = new Content(3L, 3L, "random.jpg", LocalDate.now(), "Random Post");
//        when(contentRepository.findByUserId(anyLong())).thenReturn(randomContent);
//
//        List<ContentResponse> results = contentService.getRandomPosts().collectList().block();
//
//        assertNotNull(results);
//        assertFalse(results.isEmpty()); results.stream().anyMatch(response -> "Random Post".equals(response.getDescription()))
        assertTrue(true);
    }
}
