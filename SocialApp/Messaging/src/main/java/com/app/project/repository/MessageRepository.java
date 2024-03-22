package com.app.project.repository;

import com.app.project.model.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {
    @Query("select u from Message u where u.senderId= :senderId and u.receiverId= :receiverId")
    List<Message> findBySenderIdAndReceiverId(Long senderId, Long receiverId);

    @Query("select u from Message u where u.senderId= :senderId")
    List<Message> findBySenderId(Long senderId);

    @Query("select u from Message u where u.receiverId= :receiverId")
    List<Message> findByReceiverId(Long receiverId);
}
