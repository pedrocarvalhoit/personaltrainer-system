package com.personaltrainer.user;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/get-user-name")
    public ResponseEntity<UserNameResponse> getUserName(Authentication authentication){
        return ResponseEntity.ok(userService.getUserName(authentication));
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
}
