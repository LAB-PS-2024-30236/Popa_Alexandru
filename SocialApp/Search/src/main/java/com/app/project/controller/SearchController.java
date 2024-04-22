package com.app.project.controller;

import com.app.project.dto.User;
import com.app.project.service.SearchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@RestController
public class SearchController {

    @Autowired
    private SearchService searchService;

    @GetMapping("/api/search/users")
    public List<User> searchByUsername(@RequestParam String username) {
        return Optional.ofNullable(searchService.searchByUsername(username))
                .orElseGet(Collections::emptyList);
    }
}