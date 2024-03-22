package com.app.project.controller;

import com.app.project.model.Connection;
import com.app.project.model.User;
import com.app.project.service.ConnectionService;
import com.app.project.service.Streaks;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;

import java.util.List;

@RestController
@RequestMapping("api/connections")
@CrossOrigin(origins = "*")

public class ConnectionController {
    @Autowired
    private ConnectionService userService;

    @PostMapping("/")
    public ResponseEntity<?> addUser(@RequestBody Connection user) {
        userService.addUser(user.getUserId(), user.getFollowing(), user.getFollowers());
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{userId}/follow")
    public ResponseEntity<?> addFollowing(@PathVariable Long userId, @RequestBody Long followingId) {
        userService.addFollowing(userId, followingId);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{userId}/follower")
    public ResponseEntity<?> addFollower(@PathVariable Long userId, @RequestBody Long followerId) {
        userService.addFollower(userId, followerId);
        return ResponseEntity.ok().build();
    }


    @GetMapping("/{userId}/following")
    public ResponseEntity<List<Long>> getFollowing(@PathVariable Long userId) {
        List<Long> followingIds = userService.getFollowingByUserId(userId);
        return ResponseEntity.ok(followingIds);
    }

    @GetMapping("/getUserStreak/{userId}")
    public ResponseEntity<Streaks>getUserStreak(@PathVariable Long userId){
        return ResponseEntity.ok(userService.getUserStreak(userId));
    }

    @GetMapping("/{userId}/followers")
    public ResponseEntity<List<Long>> getFollowers(@PathVariable Long userId) {
        List<Long> followingIds = userService.getFollowersByUserId(userId);
        return ResponseEntity.ok(followingIds);
    }

    @DeleteMapping("/{userId}/unfollow")
    public ResponseEntity<?> removeFollowing(@PathVariable Long userId, @RequestBody Long followingId) {
        userService.removeFollowing(userId, followingId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{userId}/unfollower")
    public ResponseEntity<?> removeFollower(@PathVariable Long userId, @RequestBody Long followerId) {
        userService.removeFollowers(userId, followerId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/getSuggestedFriends/{userId}")
    public Flux<SuggestedFriendsResponse> getSuggestedFriends(@PathVariable Long userId) {
        return userService.getSuggestedFriends(userId);
    }

    @GetMapping("/getFirstTimePostsAndRecommendations")
    public Flux<User> getNoFollowingSuggestedFriends() {
        return userService.getRandomUsers();
    }

    @GetMapping("/getConnectionType/{userId1}/{userId2}")
    public String getConnectionType(@PathVariable Long userId1, @PathVariable Long userId2){
        return userService.getConnectionType(userId1, userId2);
    }

    @PostMapping("/getConnectionTypeAndUpdateConnection/{userId1}/{userId2}")
    public void getConnectionTypeAndUpdateConnection(@PathVariable Long userId1, @PathVariable Long userId2){
         userService.getConnectionTypeAndUpdateConnection(userId1, userId2);
    }
}
