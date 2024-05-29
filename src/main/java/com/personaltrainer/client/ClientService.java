package com.personaltrainer.client;

import com.personaltrainer.common.PageResponse;
import com.personaltrainer.exception.OperationNotPermitedException;
import com.personaltrainer.user.User;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
@Transactional
public class ClientService {

    private final ClientRepository clientRepository;

    private final ClientMapper clientMapper;

    public Integer save(ClientSaveRequest request, Authentication connectedUser) {
        User user = ((User) connectedUser.getPrincipal());
        Client client = clientMapper.toClient(request);
        client.setPersonalTrainer(user);

        return clientRepository.save(client).getId();
    }

    public ClientReponse findById(Integer clientId) {
        return clientRepository.findById(clientId)
                .map(clientMapper::toClientResponse)
                .orElseThrow(()-> new EntityNotFoundException("No entity found whit id:" + clientId));
    }

    public PageResponse<ClientReponse> findAllClients(int page, int size, Authentication connectedUser) {
        User user = (User) connectedUser.getPrincipal();
        Pageable pageable = PageRequest.of(page, size, Sort.by("personalData.firstName").ascending());
        Page<Client> clients = clientRepository.findAllByEnabledIsTrueAndPersonalTrainerId(pageable, user.getId());
        List<ClientReponse> clientReponse = clients.stream()
                .map(clientMapper::toClientResponse)
                .toList();

        return new PageResponse<>(clientReponse, clients.getNumber(), clients.getSize(),
                clients.getTotalElements(), clients.getTotalPages(), clients.isFirst(), clients.isLast());
    }

    public Integer updateStatus(Integer clientId, Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        Client client = clientRepository.findById(clientId).orElseThrow(()-> new EntityNotFoundException("Entity not found"));

        if(!Objects.equals(user.getId(), client.getPersonalTrainer().getId())){
            throw new OperationNotPermitedException("This client is not on your list of clients");
        }

        client.setEnabled(!client.isEnabled());
        return clientRepository.save(client).getId();
    }
}
