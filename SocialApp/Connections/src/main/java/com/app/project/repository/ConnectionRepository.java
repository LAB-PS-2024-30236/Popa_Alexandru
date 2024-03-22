package com.app.project.repository;

import com.app.project.model.Connection;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ConnectionRepository extends MongoRepository<Connection, Long> {
    Optional<Connection> findByUserId(Long userId);
}
