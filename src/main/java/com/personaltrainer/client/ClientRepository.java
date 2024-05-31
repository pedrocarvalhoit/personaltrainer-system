package com.personaltrainer.client;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ClientRepository extends JpaRepository<Client, Integer> {

    Optional<Client> findById (Integer clientId);

//  @Query("SELECT c FROM Client c WHERE c.enabled = true AND c.personalTrainer.id = :userId")
    Page<Client> findAllByEnabledIsTrueAndPersonalTrainerId(Pageable pageable, Integer userId);

}
