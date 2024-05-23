package com.personaltrainer.common;

import jakarta.persistence.Embeddable;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Embeddable
@Getter
@Setter
public class PersonalData {

    @NotNull
    private String mobile;

    @NotNull
    private String gender;

    @NotNull
    private LocalDate dateOfBirth;

    private String photo;

}
