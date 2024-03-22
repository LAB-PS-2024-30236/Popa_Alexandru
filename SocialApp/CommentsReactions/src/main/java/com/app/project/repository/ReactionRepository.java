package com.app.project.repository;

import com.app.project.model.Reaction;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ReactionRepository extends MongoRepository<Reaction, Long> {
    Optional<Reaction>findByPostId(Long postId);
}
