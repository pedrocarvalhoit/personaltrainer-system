package com.personaltrainer.user;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TokenRepository extends JpaRepository<Integer, Token> {

    Optional<Token> findByToken(String token);

}
