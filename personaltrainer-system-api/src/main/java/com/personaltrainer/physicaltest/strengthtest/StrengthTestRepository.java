package com.personaltrainer.physicaltest.strengthtest;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface StrengthTestRepository extends JpaRepository<StrengthTest, Integer> {

    @Query("SELECT st FROM StrengthTest st WHERE st.client.id = :clientId " +
            "AND st.exercise = :exercise " +
            "AND st.createdAt >= :startDate " +
            "ORDER BY st.createdAt ASC")
    List<StrengthTest> findByClientIdAndExerciseAndDateAfter(Integer clientId, Exercise exercise, LocalDateTime startDate);

}
