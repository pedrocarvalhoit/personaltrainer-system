package com.personaltrainer.user;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor

public class UserService {

    private final UserMapper mapper;

    private final UserRepository repository;

    public UserNameResponse getUserName(Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        return mapper.toUserNameResponse(user);
    }

    public UserDataResponse getUserData(Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        return mapper.toUserDataResponse(user);
    }

    public Integer editUserData(EditUserDataRequest request, Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        mapper.toEditData(request, user);
        repository.save(user);

        return user.getId();
    }

}
