package com.app.project.repository;

import com.app.project.model.UsersLogged;
import feign.Param;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UsersLoggedRepository extends JpaRepository<UsersLogged, Long> {
    @Modifying
    @Transactional
    @Query("delete from UsersLogged q where q.userId = :userId")
    void deleteByUserId(@Param("userId") Long userId);

    @Query("select q from UsersLogged q where q.userId= :userId")
    Optional<UsersLogged> findByUserId(Long userId);
}

