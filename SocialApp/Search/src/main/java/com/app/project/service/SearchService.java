package com.app.project.service;

import com.app.project.dto.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.Collections;
import java.util.List;

@Service
public class SearchService {
    @Autowired
    private WebClient webClient;

    private List<User> getUsers(String username) {
        Mono<List<User>> userListMono = webClient
                .get()
                .uri("http://localhost:8080/api/user/search/" + username)
                .accept(MediaType.APPLICATION_JSON)
                .retrieve()
                .bodyToMono(new ParameterizedTypeReference<List<User>>() {
                })
                .onErrorReturn(Collections.emptyList());

        return userListMono.block();
    }

    public List<User> searchByUsername(String username) {
        return getUsers(username);
    }
}
