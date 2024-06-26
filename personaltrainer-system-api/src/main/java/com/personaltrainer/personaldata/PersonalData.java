package com.personaltrainer.personaldata;

import jakarta.persistence.Embeddable;
import jakarta.persistence.Transient;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.time.Period;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
public class PersonalData {

    @NotNull
    private String firstName;

    @NotNull
    private String lastName;

    @NotNull
    private String email;

    @NotNull
    private String mobile;

    private String gender;

    @NotNull
    private LocalDate dateOfBirth;

    private String photo;

    public PersonalData(PersonalDataSaveRequest personalDataSaveRequest) {
        this.firstName = personalDataSaveRequest.firstName();
        this.lastName = personalDataSaveRequest.lastName();
        this.email = personalDataSaveRequest.email();
        this.mobile = personalDataSaveRequest.mobile();
        this.gender = personalDataSaveRequest.gender();
        this.dateOfBirth = personalDataSaveRequest.dateOfBirth();
    }

    @Transient
    public String getFullName(){
        return this.firstName + " " + this.lastName;
    }

    @Transient
    public Integer getAge(){
        return Period.between(this.dateOfBirth, LocalDate.now()).getYears();
    }
}
