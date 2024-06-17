package com.personaltrainer.workoutsession;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WorkoutSessionRepository extends JpaRepository<WorkoutSession, Integer> {

    Page<WorkoutSession> findAllByClientId(Pageable pageable, Integer clientId);

    @Query("SELECT ws FROM WorkoutSession ws JOIN ws.client c WHERE c.personalTrainer.id = :userId " +
            "AND MONTH(ws.sessionDate) = MONTH(CURRENT_DATE()) " +
            "AND YEAR(ws.sessionDate) = YEAR(CURRENT_DATE())")
    List<WorkoutSession> findSessionsByUserId(@Param("userId") Integer userId);



}
