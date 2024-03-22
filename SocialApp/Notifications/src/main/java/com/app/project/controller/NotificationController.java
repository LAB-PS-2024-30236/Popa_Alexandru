package com.app.project.controller;

import com.app.project.model.Notification;
import com.app.project.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("api/notification")
@CrossOrigin(origins = "*")

public class NotificationController {
    @Autowired
    private NotificationService notificationService;

    @PostMapping
    public Mono<Notification> createNotification(@RequestBody Notification notification) {
        return notificationService.createNotification(notification);
    }

    @GetMapping("/{id}")
    public Mono<Notification> getNotification(@PathVariable Long id) {
        return notificationService.getNotification(id);
    }

    @GetMapping
    public Flux<Notification> getAllNotifications() {
        return notificationService.getAllNotifications();
    }

    @PutMapping("/{id}")
    public Mono<Notification> updateNotification(@PathVariable Long id, @RequestBody Notification notification) {
        return notificationService.updateNotification(id, notification);
    }

    @DeleteMapping("/{id}")
    public Mono<Void> deleteNotification(@PathVariable Long id) {
        return notificationService.deleteNotification(id);
    }
}
