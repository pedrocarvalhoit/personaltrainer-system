package com.personaltrainer.workoutprogram;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WorkoutProgramRepository extends JpaRepository<WorkoutProgram, Integer> {

    Page<WorkoutProgram> findAllByClientIdAndEnabledIsTrue(Pageable pageable, Integer clientId);

    Page<WorkoutProgram> findAllByClientIdAndEnabledIsFalse(Pageable pageable, Integer clientId);


}
