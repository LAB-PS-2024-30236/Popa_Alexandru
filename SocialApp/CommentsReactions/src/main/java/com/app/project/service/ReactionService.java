package com.app.project.service;

import com.app.project.model.Reaction;

import com.app.project.repository.ReactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Collections;
import java.util.List;

@Service
public class ReactionService {
    @Autowired
    private ReactionRepository reactionRepository;
    @Autowired
    private WebClient webClient;

    public void addReaction(Long postId, List<Long> userLikes) {
        Reaction user = new Reaction();
        user.setPostId(postId);
        user.setUserLikes(userLikes);
        reactionRepository.save(user);
    }

    public List<Long> getLikesByPost(Long postId) {
        return reactionRepository.findByPostId(postId)
                .map(Reaction::getUserLikes)
                .orElse(Collections.emptyList());
    }

    public void addLike(Long postId, Long userLikes) {
        Reaction reaction = reactionRepository.findByPostId(postId).orElse(null);
        if (reaction != null && !reaction.getUserLikes().contains(userLikes)) {
            reaction.getUserLikes().add(userLikes);
            reactionRepository.delete(reaction);
            reactionRepository.save(reaction);
        }
    }

    public void removeLike(Long postId, Long userLike) {
        Reaction reaction = reactionRepository.findByPostId(postId).orElse(null);
        if (reaction != null && reaction.getUserLikes().contains(userLike)) {
            reaction.getUserLikes().remove(userLike);
            reactionRepository.delete(reaction);
            reactionRepository.save(reaction);
        }
    }
}
