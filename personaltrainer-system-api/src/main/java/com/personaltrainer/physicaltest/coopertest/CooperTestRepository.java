package com.personaltrainer.physicaltest.coopertest;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CooperTestRepository extends JpaRepository<CooperTest, Integer> {

    @Query("SELECT ct FROM CooperTest ct WHERE ct.client.id = :clientId " +
            "ORDER BY ct.createdAt ASC")
    List<CooperTest> findTwelveMonthsHistory(@Param("clientId") Integer clientId,
                                             Pageable pageable);
}

