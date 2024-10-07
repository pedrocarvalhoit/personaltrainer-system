package com.personaltrainer.common;

import com.personaltrainer.client.Client;
import com.personaltrainer.client.ClientRepository;
import com.personaltrainer.exception.OperationNotPermitedException;
import com.personaltrainer.physicaltest.coopertest.CooperTest;
import com.personaltrainer.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
@RequiredArgsConstructor
public class PermissionUtil {

    private final ClientRepository repository;


    //Checks if the Client belongs to authenticated User
    public void checkPermition(Client client, Authentication authentication){
        User user = (User) authentication.getPrincipal();
        if (!Objects.equals(client.getPersonalTrainer().getId(), user.getId())){
            throw new OperationNotPermitedException();
        }
    }

    public void checkPermitionWithId(Integer clientId, Authentication authentication){
        Client client = repository.findById(clientId).get();
        User user = (User) authentication.getPrincipal();
        if (!Objects.equals(client.getPersonalTrainer().getId(), user.getId())){
            throw new OperationNotPermitedException();
        }
    }

    public void checkCooperTestPermission(CooperTest cooperTest, Authentication authentication){
        User user = (User) authentication.getPrincipal();

        if(!user.getClients().contains(cooperTest.getClient())){
            throw new OperationNotPermitedException();
        }
    }

}
