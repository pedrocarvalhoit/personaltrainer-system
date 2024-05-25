package com.personaltrainer.client;

import com.personaltrainer.personaldata.PersonalDataSaveRequest;
import jakarta.validation.Valid;

public record SaveClientRequest(

        @Valid
        PersonalDataSaveRequest personalData

){
}
