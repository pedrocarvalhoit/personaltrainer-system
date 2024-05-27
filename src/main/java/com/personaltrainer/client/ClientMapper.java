package com.personaltrainer.client;

import com.personaltrainer.personaldata.PersonalData;
import com.personaltrainer.personaldata.PersonalDataSaveRequest;
import org.springframework.stereotype.Service;

@Service
public class ClientMapper {

    public Client toClient(ClientSaveRequest request){
        PersonalDataSaveRequest personalDataSaveRequest = request.personalData();
        PersonalData personalData = new PersonalData(personalDataSaveRequest);

        return Client.builder()
                .personalData(personalData)
                .build();
    }

    public ClientReponse toClientResponse(Client client) {
        return ClientReponse.builder()
                .id(client.getId())
                .fullName(client.getPersonalData().getFullName())
                .email(client.getPersonalData().getEmail())
                .mobile(client.getPersonalData().getMobile())
                //.photo(client.getPersonalData().getPhoto())
                .enabled(client.isEnabled())
                .build();
    }
}
