package com.app.project.repository;

import com.app.project.model.Content;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;

import java.util.List;

@Repository
public interface ContentRepository extends JpaRepository<Content, Long> {

    @Query("SELECT p from Content p where p.userId= :userId")
    List<Content> findByUserId(Long userId);


    @Query("SELECT c FROM Content c WHERE c.userId = :userId")
    List<Content> findAllByUserId(@Param("userId") Long userId);

    @Query("SELECT p FROM Content p WHERE p.userId = :userId ORDER BY p.datePosted DESC")
    Page<Content> findLatestByUserId(Long userId, Pageable pageable);
}