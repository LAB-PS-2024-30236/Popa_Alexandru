package com.app.project.repository;

import com.app.project.model.Story;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;

import java.util.List;

@Repository
public interface StoryRepository extends JpaRepository<Story, Long> {
    @Query("SELECT p from Story p where p.userId= :userId")
    List<Story> findByUserId(Long userId);
}
