package com.personaltrainer.client;

import com.personaltrainer.personaldata.PersonalDataSaveRequest;
import jakarta.validation.Valid;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

public record SaveClientRequest(

        @Valid
        PersonalDataSaveRequest personalData

){
}
