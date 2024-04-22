package com.app.project;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
public class CommentsReactionsProjectApplication {

	public static void main(String[] args) {
		SpringApplication.run(CommentsReactionsProjectApplication.class, args);
	}

}
