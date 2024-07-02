package com.personaltrainer.user;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserMapper {

    private final PasswordEncoder passwordEncoder;

    public UserDataMenuResponse toUserDataMenuResponse(User user) {
        return UserDataMenuResponse.builder()
                .firstName(user.getFirstName())
                .photo(user.getImagePath())
                .build();
    }

    public UserDataResponse toUserDataResponse(User user) {
        return UserDataResponse.builder()
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .dateOfBirth(user.getDateOfBirth())
                .mobile(user.getMobile())
                .gender(user.getGender())
                .build();
    }

    public void toEditData(EditUserDataRequest request, User user) {
        if(request.firstName() != null && !request.firstName().trim().isEmpty()){
            user.setFirstName(request.firstName());
        }

        if(request.lastName() != null && !request.lastName().trim().isEmpty()){
            user.setLastName(request.lastName());
        }

        if (request.email() != null && !request.email().trim().isEmpty()){
            user.setEmail(request.email());
        }

        if (request.password() != null && !request.password().trim().isEmpty()){
            user.setPassword(passwordEncoder.encode(request.password()));
        }

        if (request.dateOfBirth() != null){
            user.setDateOfBirth(request.dateOfBirth());
        }

        if (request.mobile() != null && !request.mobile().trim().isEmpty()){
            user.setMobile(request.mobile());
        }

        if (request.gender() != null && !request.gender().trim().isEmpty()){
            user.setGender(request.gender());
        }

    }
}
