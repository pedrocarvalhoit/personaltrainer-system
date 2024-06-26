package com.personaltrainer.client;

import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ClientReponse {

    private Integer id;
    private String firstName;
    private String lastName;
    private String fullName;
    private String email;
    private String mobile;
    private String photo;
    private LocalDate dateOfBirthday;
    private Integer age;
    private String gender;
    private boolean enabled;

}
