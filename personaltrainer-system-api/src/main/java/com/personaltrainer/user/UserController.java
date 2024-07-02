package com.personaltrainer.user;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/get-user-data-menu")
    public ResponseEntity<UserDataMenuResponse> getUserDataForMenu(Authentication authentication){
        return ResponseEntity.ok(userService.getUserDataForMenu(authentication));
    }

    @GetMapping("/get-user-data")
    public ResponseEntity<UserDataResponse> getUserData(Authentication authentication){
        return ResponseEntity.ok(userService.getUserData(authentication));
    }

    @PostMapping("/edit")
    public ResponseEntity<Integer> editUser(@Valid @RequestBody EditUserDataRequest request,
                                            Authentication authentication){
        return ResponseEntity.ok(userService.editUserData(request, authentication));
    }

    @PatchMapping("/update-photo")
    public ResponseEntity<Integer> updatePhoto(@RequestPart("file")MultipartFile file,
                                               Authentication authentication) throws IOException {
        return ResponseEntity.ok(userService.updatePhoto(authentication, file));
    }
}
