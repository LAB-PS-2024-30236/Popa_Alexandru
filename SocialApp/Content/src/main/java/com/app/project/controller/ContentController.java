package com.app.project.controller;

import com.app.project.model.Content;
import com.app.project.service.ContentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.List;

@RestController
@RequestMapping("api/content")
@CrossOrigin(origins = "*")
public class ContentController {
    @Autowired
    private ContentService contentService;

    @GetMapping("/getFeedPosts/{userId}")
    public Flux<ContentResponse> getFeedPosts(@PathVariable Long userId) {
        return contentService.getPosts(userId);
    }

    @GetMapping("/getSections")
    public List<ContentSection>getSections(){
        return ContentService.sectionList;
    }

//    @GetMapping("/getSuggestedPosts/{userId}")
//    public Flux<ContentResponse> getSuggestedPosts(@PathVariable Long userId) {
//        return contentService.getSuggestedPosts(userId);
//    }

    @GetMapping("getUserPosts/{userId}")
    public ResponseEntity<List<Content>> getUserPosts(@PathVariable Long userId){
        return ResponseEntity.ok(contentService.getUserPosts(userId));
    }

    @GetMapping("/getRandomPosts/{userId}")
    public Flux<ContentResponse> getRandomPosts(@PathVariable Long userId) {
        return contentService.getRandomPosts(userId);
    }

    @PostMapping("/addPost")
    public Content addPost(@RequestBody Content content){
        return contentService.addPost(content);
    }
}

