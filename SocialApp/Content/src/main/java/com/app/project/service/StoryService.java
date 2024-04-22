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

        // Create a Flux for the friends' stories
        Flux<StoryResponse> friendsStories = getUserFriends(userId)
                .flatMap(friendId -> getUser(friendId)
                        .flatMapMany(user -> Flux.fromIterable(storyRepository.findByUserId(friendId))
                                .filter(story -> story.getDatePosted().isAfter(ChronoLocalDate.from(timeLimit)))
                                .map(story -> mapToStoryResponse(story, user))
                        )
                );

        // Create a Flux for the user's own stories
        Flux<StoryResponse> userStories = getUser(userId)
                .flatMapMany(user -> Flux.fromIterable(storyRepository.findByUserId(userId))
                        .filter(story -> story.getDatePosted().isAfter(ChronoLocalDate.from(timeLimit)))
                        .map(story -> mapToStoryResponse(story, user))
                );

        // Merge the user's stories with friends' stories and return the resulting Flux
        return Flux.merge(friendsStories, userStories);
    }


    public Flux<StoryResponse> getRandomStories() {
        LocalDateTime timeLimit = LocalDateTime.now().minusHours(24);

        return generateRandomIds()
                .flatMap(friendId ->
                        getUser((Long) friendId)
                                .flatMapMany(user ->
                                        Flux.fromIterable(storyRepository.findByUserId((Long) friendId))
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

    private List<Story> getstory(Long userId){
       return storyRepository.findByUserId(userId);
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

    private Flux<Object> generateRandomIds() {
        Random random = new Random();
        return Flux.create(sink -> {
            for (int i = 0; i < 5; i++) {
                Long randomNumber = (long) random.nextInt(1, 6); // Assuming IDs range from 1 to 5
                sink.next(randomNumber);
            }
            sink.complete();
        }).distinct().take(5);
    }

    public Story addStory(Story story){
        return storyRepository.save(story);
    }

}
