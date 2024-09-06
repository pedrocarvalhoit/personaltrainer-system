package com.personaltrainer.inicialassessment;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InicialAssessmentRepository extends JpaRepository<InicialAssessment, Integer> {
}
