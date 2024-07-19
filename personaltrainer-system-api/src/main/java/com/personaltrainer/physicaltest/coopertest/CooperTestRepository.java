package com.personaltrainer.physicaltest.coopertest;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CooperTestRepository extends JpaRepository<CooperTest, Integer> {
}
