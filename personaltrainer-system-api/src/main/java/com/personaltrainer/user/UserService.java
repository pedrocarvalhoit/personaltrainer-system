package com.personaltrainer.user;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor

public class UserService {

    private final UserMapper mapper;

    public UserNameResponse getUserName(Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        return mapper.toUserNameResponse(user);
    }
}
