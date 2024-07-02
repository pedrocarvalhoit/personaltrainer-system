package com.personaltrainer.user;

import com.personaltrainer.AmazonS3Util;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
@RequiredArgsConstructor

public class UserService {

    private final UserMapper mapper;

    private final UserRepository repository;

    public UserDataMenuResponse getUserDataForMenu(Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        return mapper.toUserDataMenuResponse(user);
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

    public Integer updatePhoto(Authentication authentication, MultipartFile file) throws IOException {
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        User user = (User) authentication.getPrincipal();

        user.setPhoto(fileName);
        User savedUser = repository.save(user);

        String uploadDir = "user-photos/" + savedUser.getId();
        AmazonS3Util.removeFolder(uploadDir);
        AmazonS3Util.uploadFile(uploadDir, fileName, file.getInputStream());

        return user.getId();
    }
}
