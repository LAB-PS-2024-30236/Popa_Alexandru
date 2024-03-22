package com.app.project.repository;

import com.app.project.model.Content;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ContentRepository extends JpaRepository<Content, Long> {

    @Query("SELECT p from Content p where p.userId= :userId")
    Content findByUserId(Long userId);

    @Query("SELECT c FROM Content c WHERE c.userId = :userId")
    List<Content> findAllByUserId(@Param("userId") Long userId);

}