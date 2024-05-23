package com.personaltrainer;

import com.personaltrainer.role.Role;
import com.personaltrainer.role.RoleRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableJpaAuditing
@EnableAsync
public class PersonaltrainerSystemApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(PersonaltrainerSystemApiApplication.class, args);}

		@Bean
		public CommandLineRunner runner(RoleRepository roleRepository){
			return args -> {
				if (roleRepository.findByName("USER").isEmpty()){
					roleRepository.save(new Role("USER"));
				}
			};
		}

	}


