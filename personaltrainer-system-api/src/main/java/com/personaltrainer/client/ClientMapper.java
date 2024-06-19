package com.personaltrainer.client;

import com.personaltrainer.file.FileUtils;
import com.personaltrainer.personaldata.PersonalData;
import com.personaltrainer.personaldata.PersonalDataSaveRequest;
import com.personaltrainer.personaldata.PersonalDataUpdateRequest;
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
                .photo(FileUtils.readFileFromLocation(client.getPersonalData().getPhoto()))
                .age(client.getPersonalData().getAge())
                .enabled(client.isEnabled())
                .build();
    }

    public void toUpdateClient(ClientUpdateRequest request, Client client) {
        PersonalDataUpdateRequest personalDataUpdateRequest = request.personalData();

        if (personalDataUpdateRequest.email() != null && !personalDataUpdateRequest.email().trim().isEmpty()){
            client.getPersonalData().setEmail(personalDataUpdateRequest.email());
        }
        if (personalDataUpdateRequest.mobile() != null && !personalDataUpdateRequest.mobile().trim().isEmpty()) {
            client.getPersonalData().setMobile(personalDataUpdateRequest.mobile());
        }
    }

}
