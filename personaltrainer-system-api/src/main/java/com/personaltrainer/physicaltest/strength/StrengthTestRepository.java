package com.personaltrainer.physicaltest.strength;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StrengthTestRepository extends JpaRepository<StrengthTest, Integer> {
}
