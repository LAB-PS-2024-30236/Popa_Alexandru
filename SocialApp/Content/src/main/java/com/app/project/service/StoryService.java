package com.app.project.service;

import com.app.project.controller.StoryResponse;
import com.app.project.model.Story;
import com.app.project.model.User;
import com.app.project.repository.StoryRepository;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.time.LocalDateTime;
import java.time.chrono.ChronoLocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Service
public class StoryService {

    @Autowired
    private WebClient webClient;

    @Autowired
    private StoryRepository storyRepository;

    public Flux<StoryResponse> getStories(Long userId) {
        LocalDateTime timeLimit = LocalDateTime.now().minusHours(24);

        return getUserFriends(userId)
                .flatMap(friendId ->
                        getUser(friendId)
                                .flatMapMany(user ->
                                        Flux.fromIterable(storyRepository.findByUserId(friendId))
                                                .filter(story -> story.getDatePosted().isAfter(ChronoLocalDate.from(timeLimit))) // Filter stories newer than 24 hours
                                                .map(story -> mapToStoryResponse(story, user))
                                )
                );
    }

    public Flux<StoryResponse> getRandomStories() {
        LocalDateTime timeLimit = LocalDateTime.now().minusHours(24);

        return generateRandomIds()
                .flatMap(friendId ->
                        getUser(friendId)
                                .flatMapMany(user ->
                                        Flux.fromIterable(storyRepository.findByUserId(friendId))
                                                .filter(story -> story.getDatePosted().isAfter(ChronoLocalDate.from(timeLimit))) // Filter stories newer than 24 hours
                                                .map(story -> mapToStoryResponse(story, user))
                                )
                );
    }


    private Flux<Long> getUserFriends(@NonNull Long userId) {
        var webRequest = webClient
                .get()
                .uri("http://localhost:8085/api/connections/" + userId + "/following")
                .accept(MediaType.APPLICATION_JSON);

        return webRequest.exchangeToFlux(response -> {
            if (response.statusCode() == HttpStatus.OK) {
                return response.bodyToFlux(Long.class);
            } else {
                return response.bodyToFlux(String.class)
                        .flatMap(body -> Flux.error(new RuntimeException("Request failed:" + body)));
            }
        });
    }

    private StoryResponse mapToStoryResponse(Story story, User userEntity) {
        return StoryResponse.builder()
                .storyId(story.getStoryId())
                .datePosted(story.getDatePosted())
                .photo(story.getPhoto())
                .user(userEntity)
                .build();
    }

    private Mono<User> getUser(@NonNull Long userId) {
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
        });
    }

    private Flux<Long> generateRandomIds() {
        Random random = new Random();
        List<Long> randomUserId = new ArrayList<>();
        for (int i = 0; i < 5; i++) {
            Long randomNumber = (long) random.nextInt(1, 5);
            randomUserId.add(randomNumber);
        }

        return (Flux<Long>) randomUserId;
    }
}
