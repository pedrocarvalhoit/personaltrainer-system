package com.personaltrainer.personaldata;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public record PersonalDataSaveRequest(

        @NotNull(message = "100")
        @NotBlank(message = "100")
        String firstName,

        @NotNull(message = "101")
        @NotBlank(message = "101")
        String lastName,

        @NotNull(message = "103")
        @NotBlank(message = "103")
        String email,

        @NotNull(message = "104")
        @NotBlank(message = "104")
        String mobile,

        @NotNull(message = "105")
        @NotBlank(message = "105")
        String gender,

        @NotNull(message = "106")
        LocalDate dateOfBirth,

        String photo
)
{
}
