package com.app.project;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@SpringBootApplication
@EnableMongoRepositories
public class ConnectionsProjectApplication {

    public static void main(String[] args) {
        SpringApplication.run(ConnectionsProjectApplication.class, args);
    }

}
