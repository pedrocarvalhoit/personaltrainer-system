package com.personaltrainer.user;

import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserDataResponse {

    private String firstName;
    private String lastName;
    private String email;
    private LocalDate dateOfBirth;
    private String mobile;
    private String gender;

}
