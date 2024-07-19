package com.personaltrainer;

import com.personaltrainer.role.Role;
import com.personaltrainer.role.RoleRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableJpaAuditing
@EnableAsync
@EnableScheduling
@EntityScan({"com.personaltrainer.user", "com.personaltrainer.client", "com.personaltrainer.role", "com.personaltrainer.workoutprogram",
		"com.personaltrainer.workoutsession","com.personaltrainer.role", "com.personaltrainer.common","com.personaltrainer.sheduler"
		,"com.personaltrainer.physicaltest"})
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


