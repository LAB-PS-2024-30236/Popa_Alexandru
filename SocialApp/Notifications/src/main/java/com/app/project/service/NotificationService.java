package com.app.project.service;

import com.app.project.model.Notification;
import com.app.project.repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
public class NotificationService {
    @Autowired
    private NotificationRepository notificationRepository;

    public Mono<Notification> createNotification(Notification notification) {
        return Mono.just(notificationRepository.save(notification));
    }

    public Mono<Notification> getNotification(Long id) {
        return Mono.justOrEmpty(notificationRepository.findById(id));
    }

    public Flux<Notification> getAllNotifications() {
        return Flux.fromIterable(notificationRepository.findAll());
    }

    public Mono<Notification> updateNotification(Long id, Notification notificationDetails) {
        return Mono.justOrEmpty(notificationRepository.findById(id))
                .map(notification -> {
                    notification.setTitle(notificationDetails.getTitle());
                    notification.setMessage(notificationDetails.getMessage());
                    notification.setDateTime(notificationDetails.getDateTime());
                    notification.setIsRead(notificationDetails.getIsRead());
                    return notificationRepository.save(notification);
                });
    }

    public Mono<Void> deleteNotification(Long id) {
        return Mono.justOrEmpty(notificationRepository.findById(id))
                .map(notification -> {
                    notificationRepository.delete(notification);
                    return notification;
                })
                .then(Mono.empty());
    }
}
