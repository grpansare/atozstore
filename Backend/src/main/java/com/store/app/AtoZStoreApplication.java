package com.store.app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

import io.github.cdimascio.dotenv.Dotenv;

@SpringBootApplication
@ComponentScan(basePackages="com.store.app.*")
//@ComponentScan( basePackages = {"com.store.app.service", "com.store.app.controller", "com.store.app.dao"})
public class AtoZStoreApplication {

	public static void main(String[] args) {
		  // Load environment variables from .env file
	

	        SpringApplication.run(AtoZStoreApplication.class, args);
	}

}
