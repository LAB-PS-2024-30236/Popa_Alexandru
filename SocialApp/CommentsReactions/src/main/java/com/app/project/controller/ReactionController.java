package com.app.project.controller;

import com.app.project.model.Reaction;
import com.app.project.service.ReactionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/reactions")
@CrossOrigin(origins = "*")

public class ReactionController {
    @Autowired
    private ReactionService reactionService;

    @PostMapping("/")
    public ResponseEntity<?> addReaction(@RequestBody Reaction reaction) {
        reactionService.addReaction(reaction.getPostId(), reaction.getUserLikes());
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{postId}/follow")
    public ResponseEntity<?> addLike(@PathVariable Long postId, @RequestBody Long userLike) {
        reactionService.addLike(postId, userLike);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{postId}/liked")
    public ResponseEntity<Long> getLikes(@PathVariable Long postId) {
        List<Long> usersLikes = reactionService.getLikesByPost(postId);
        return ResponseEntity.ok((long) usersLikes.size());
    }

    @DeleteMapping("/{postId}/unlike")
    public ResponseEntity<?> removeLike(@PathVariable Long postId, @RequestBody Long userLike) {
        reactionService.removeLike(postId, userLike);
        return ResponseEntity.ok().build();
    }
    /*comments should be able to replay to them. how?
    1)have a parent id and fetch them by the parent id,
      the parent id is 0 by default and 1 if it is a replay then we sort them by the date posted.
    * */

}
