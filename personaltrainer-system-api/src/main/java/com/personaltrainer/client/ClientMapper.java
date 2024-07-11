package com.personaltrainer.client;

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

    public ClientReponse toClientResponse(Client client){
        return ClientReponse.builder()
                .id(client.getId())
                .firstName(client.getPersonalData().getFirstName())
                .lastName(client.getPersonalData().getLastName())
                .fullName(client.getPersonalData().getFullName())
                .email(client.getPersonalData().getEmail())
                .mobile(client.getPersonalData().getMobile())
                .photo(client.getImagePath())
                .dateOfBirthday(client.getPersonalData().getDateOfBirth())
                .age(client.getPersonalData().getAge())
                .gender(client.getPersonalData().getGender())
                .enabled(client.isEnabled())
                .build();
    }

    public void toUpdateClient(ClientUpdateRequest request, Client client) {
        PersonalDataUpdateRequest personalDataUpdateRequest = request.personalData();
        if (personalDataUpdateRequest.firstName() != null && !personalDataUpdateRequest.firstName().trim().isEmpty()){
            client.getPersonalData().setFirstName(personalDataUpdateRequest.firstName());
        }
        if (personalDataUpdateRequest.lastName() != null && !personalDataUpdateRequest.lastName().trim().isEmpty()){
            client.getPersonalData().setLastName(personalDataUpdateRequest.lastName());
        }
        if (personalDataUpdateRequest.email() != null && !personalDataUpdateRequest.email().trim().isEmpty()){
            client.getPersonalData().setEmail(personalDataUpdateRequest.email());
        }
        if (personalDataUpdateRequest.mobile() != null && !personalDataUpdateRequest.mobile().trim().isEmpty()) {
            client.getPersonalData().setMobile(personalDataUpdateRequest.mobile());
        }
        if (personalDataUpdateRequest.dateOfBirthday() != null && !personalDataUpdateRequest.firstName().trim().isEmpty()){
            client.getPersonalData().setFirstName(personalDataUpdateRequest.firstName());
        }
        if (personalDataUpdateRequest.gender() != null && !personalDataUpdateRequest.gender().trim().isEmpty()){
            client.getPersonalData().setGender(personalDataUpdateRequest.gender());
        }
    }

}
