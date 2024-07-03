package com.personaltrainer.workoutsession;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface WorkoutSessionRepository extends JpaRepository<WorkoutSession, Integer> {

    Page<WorkoutSession> findAllByClientId(Pageable pageable, Integer clientId);

    List<WorkoutSession> findAllByClientId(Integer clientId);

    List<WorkoutSession> findAllByExecutedIsTrueAndClientId(Integer clientId);

    List<WorkoutSession> findAllByExecutedIsFalseAndClientId(Integer clientId);

    @Query("SELECT ws FROM WorkoutSession ws JOIN ws.client c WHERE c.personalTrainer.id = :userId " +
            "AND MONTH(ws.sessionDate) = MONTH(CURRENT_DATE()) " +
            "AND YEAR(ws.sessionDate) = YEAR(CURRENT_DATE()) ")
    List<WorkoutSession> findTotalMonthlySessionsByUserId(@Param("userId") Integer userId);

    @Query("SELECT ws FROM WorkoutSession ws JOIN ws.client c WHERE c.personalTrainer.id = :userId " +
            "AND MONTH(ws.sessionDate) = MONTH(CURRENT_DATE()) " +
            "AND YEAR(ws.sessionDate) = YEAR(CURRENT_DATE()) " +
            "AND ws.executed = true")
    List<WorkoutSession> findTotalMonthlyExecutedSessionsByUserId(@Param("userId") Integer userId);

    @Query("SELECT ws FROM WorkoutSession ws JOIN ws.client c WHERE c.personalTrainer.id = :userId " +
            "AND MONTH(ws.sessionDate) = MONTH(CURRENT_DATE()) " +
            "AND YEAR(ws.sessionDate) = YEAR(CURRENT_DATE()) " +
            "AND ws.executed = false")
    List<WorkoutSession> findTotalMonthlyNotExecutedSessionsByUserId(@Param("userId") Integer userId);

    @Query("SELECT ws FROM WorkoutSession ws JOIN ws.client c " +
            "WHERE c.personalTrainer.id = :userId " +
            "AND ws.sessionDate BETWEEN :startDate AND :endDate " +
            "ORDER BY ws.sessionDate ASC, ws.sessionTime ASC") // Ascending sessionDate
    List<WorkoutSession> findSessionsForNextWeek(@Param("startDate") LocalDate startDate,
                                                 @Param("endDate") LocalDate endDate,
                                                 @Param("userId") Integer userId);

    @Query("SELECT ws FROM WorkoutSession ws JOIN ws.client c " +
            "WHERE c.personalTrainer.id = :userId " +
            "AND MONTH(ws.sessionDate) = MONTH(CURRENT_DATE()) " +
            "ORDER BY ws.sessionDate ASC, ws.sessionTime ASC") // Ascending sessionDate
    List<WorkoutSession> findSessionsByDate(@Param("userId") Integer userId);

    @Transactional
    @Modifying
    @Query("DELETE from WorkoutSession ws WHERE ws.client.id = :clientId")
    void deleteAllByClientId(Integer clientId);

}
