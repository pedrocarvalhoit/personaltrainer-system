package com.personaltrainer.workoutsession;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WorkoutSessionRepository extends JpaRepository<WorkoutSession, Integer> {

    Page<WorkoutSession> findAllByClientId(Pageable pageable, Integer clientId);

}
