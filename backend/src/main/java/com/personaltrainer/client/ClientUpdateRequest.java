package com.personaltrainer.client;

import com.personaltrainer.personaldata.PersonalDataSaveRequest;
import com.personaltrainer.personaldata.PersonalDataUpdateRequest;
import jakarta.validation.Valid;

public record ClientUpdateRequest(

        @Valid
        PersonalDataUpdateRequest personalData

){
}
