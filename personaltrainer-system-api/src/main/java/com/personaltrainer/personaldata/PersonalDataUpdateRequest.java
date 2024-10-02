package com.personaltrainer.personaldata;

import java.time.LocalDate;

public record PersonalDataUpdateRequest(

        String firstName,

        String lastName,

        String email,

        String mobile,

        String gender,

        LocalDate dateOfBirth
) {
}
