package com.personaltrainer.client;

import com.personaltrainer.personaldata.PersonalDataSaveRequest;
import jakarta.validation.Valid;

public record ClientSaveRequest(

        @Valid
        PersonalDataSaveRequest personalData

){
}
