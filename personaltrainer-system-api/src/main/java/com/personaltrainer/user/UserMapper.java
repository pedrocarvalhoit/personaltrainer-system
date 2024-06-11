package com.personaltrainer.user;

import org.springframework.stereotype.Service;

@Service
public class UserMapper {


    public UserNameResponse toUserNameResponse(User user) {
        return UserNameResponse.builder()
                .firstName(user.getFirstName())
                .build();
    }
}
