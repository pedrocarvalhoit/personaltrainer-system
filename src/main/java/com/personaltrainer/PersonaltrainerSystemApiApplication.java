package com.personaltrainer;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class PersonaltrainerSystemApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(PersonaltrainerSystemApiApplication.class, args);
	}

}
