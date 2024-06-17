package com.personaltrainer.client;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ClientRepository extends JpaRepository<Client, Integer> {

    Optional<Client> findById (Integer clientId);

//  @Query("SELECT c FROM Client c WHERE c.enabled = true AND c.personalTrainer.id = :userId")
    Page<Client> findAllByEnabledIsTrueAndPersonalTrainerId(Pageable pageable, Integer userId);

    List<Client> findAllByPersonalTrainerId(Integer id);

    @Query("SELECT c.personalData.firstName " +
            "FROM Client c " +
            "LEFT JOIN c.workoutSession ws " +
            "WHERE c.personalTrainer.id = :trainerId " +
            "AND FUNCTION('MONTH', ws.sessionDate) = FUNCTION('MONTH', CURRENT_DATE) " +
            "AND FUNCTION('YEAR', ws.sessionDate) = FUNCTION('YEAR', CURRENT_DATE) " +
            "GROUP BY c.id " +
            "ORDER BY COUNT(ws) DESC")
    List<String> findTop3ClientsNamesWithMostSessions(@Param("trainerId") Integer trainerId, Pageable pageable);

    @Query("SELECT COUNT(ws) " +
            "FROM WorkoutSession ws " +
            "JOIN ws.client c " +
            "WHERE c.personalTrainer.id = :tainerId " +
            "AND MONTH(ws.sessionDate) = MONTH(CURRENT_DATE()) " +
            "AND YEAR(ws.sessionDate) = YEAR(CURRENT_DATE()) " +
            "GROUP BY c.personalData.firstName " +
            "ORDER BY COUNT(ws) DESC")
    List<Integer> findTop3SessionsQuantityPerTop3Clients(@Param("tainerId") Integer id, Pageable pageable);
}
