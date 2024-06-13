package com.personaltrainer.user;

import java.time.LocalDate;

public record EditUserDataRequest (
        String firstName,

        String lastName,

        String email,

        String password,

        LocalDate dateOfBirth,

        String mobile,

        String gender
        ){


}
