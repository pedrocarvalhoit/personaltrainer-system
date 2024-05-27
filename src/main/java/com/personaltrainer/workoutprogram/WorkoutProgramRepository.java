package com.personaltrainer.workoutprogram;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WorkoutProgramRepository extends JpaRepository<WorkoutProgram, Integer> {
}
