package com.personaltrainer.client;

import com.personaltrainer.personaldata.PersonalData;
import com.personaltrainer.personaldata.PersonalDataSaveRequest;
import org.springframework.stereotype.Service;

@Service
public class ClientMapper {

    public Client toClient(SaveClientRequest request){
        PersonalDataSaveRequest personalDataSaveRequest = request.personalData();
        PersonalData personalData = new PersonalData(personalDataSaveRequest);

        return Client.builder()
                .personalData(personalData)
                .build();
    }

}
