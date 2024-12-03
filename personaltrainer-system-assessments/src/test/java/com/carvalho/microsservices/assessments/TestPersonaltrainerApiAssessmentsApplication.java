package com.carvalho.microsservices.assessments;

import org.springframework.boot.SpringApplication;

public class TestPersonaltrainerApiAssessmentsApplication {

	public static void main(String[] args) {
		SpringApplication.from(PersonaltrainerApiAssessmentsApplication::main).with(TestcontainersConfiguration.class).run(args);
	}

}
