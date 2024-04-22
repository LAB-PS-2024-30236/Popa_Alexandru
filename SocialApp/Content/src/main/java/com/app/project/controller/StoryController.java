package com.app.project.controller;

import com.app.project.model.Story;
import com.app.project.service.StoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;

@RestController
@RequestMapping("api/content")
@CrossOrigin(origins = "*")

public class StoryController {
    @Autowired
    private StoryService storyService;

    @GetMapping("/getFeedStories/{userId}")
    public Flux<StoryResponse> getFeedStories(@PathVariable Long userId) {
        return storyService.getStories(userId);
    }

    @GetMapping("/getRandomFeedStories")
    public Flux<StoryResponse> getRandomFeedStories() {
        return storyService.getRandomStories();
    }

    @PostMapping("/addStory")
    public Story addStory(@RequestBody Story story){
        return storyService.addStory(story);
    }
}
