package com.personaltrainer.client;

import com.personaltrainer.common.PageResponse;
import com.personaltrainer.common.UserPermissionOverClientCheck;
import com.personaltrainer.file.FileStorageService;
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
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class ClientService {

    private final ClientRepository clientRepository;
    private final ClientMapper clientMapper;
    private final UserPermissionOverClientCheck permition;
    private final FileStorageService fileStorageService;


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

    public PageResponse<ClientReponse> findAllEnabledClients(int page, int size, Authentication connectedUser) {
        User user = (User) connectedUser.getPrincipal();
        Pageable pageable = PageRequest.of(page, size, Sort.by("personalData.firstName").ascending());
        Page<Client> clients = clientRepository.findAllByEnabledIsTrueAndPersonalTrainerId(pageable, user.getId());
        List<ClientReponse> clientReponse = clients.stream()
                .map(clientMapper::toClientResponse)
                .toList();

        return new PageResponse<>(clientReponse, clients.getNumber(), clients.getSize(),
                clients.getTotalElements(), clients.getTotalPages(), clients.isFirst(), clients.isLast());
    }

    public PageResponse<ClientReponse> findAllDisabledClients(int page, int size, Authentication connectedUser) {
        User user = (User) connectedUser.getPrincipal();
        Pageable pageable = PageRequest.of(page, size, Sort.by("personalData.firstName").ascending());
        Page<Client> clients = clientRepository.findAllByEnabledIsFalseAndPersonalTrainerId(pageable, user.getId());
        List<ClientReponse> clientReponse = clients.stream()
                .map(clientMapper::toClientResponse)
                .toList();

        return new PageResponse<>(clientReponse, clients.getNumber(), clients.getSize(),
                clients.getTotalElements(), clients.getTotalPages(), clients.isFirst(), clients.isLast());
    }

    public Integer updateStatus(Integer clientId, Authentication authentication) {
        Client client = clientRepository.findById(clientId).orElseThrow(()-> new EntityNotFoundException("Entity not found"));
        permition.checkPermition(client, authentication);

        client.setEnabled(!client.isEnabled());
        return clientRepository.save(client).getId();
    }

    public Integer updatePersonalData(Integer clientId,
                                      Authentication authentication,
                                      ClientUpdateRequest request) {
        Client client = clientRepository.findById(clientId).orElseThrow(()-> new EntityNotFoundException("Entity not found"));
        permition.checkPermition(client, authentication);

        clientMapper.toUpdateClient(request, client);
        clientRepository.save(client);

        return clientId;
    }

    public Integer delete(Integer clientId, Authentication authentication) {
        Client client = clientRepository.findById(clientId).orElseThrow(()-> new EntityNotFoundException("Entity not found"));
        permition.checkPermition(client, authentication);

        clientRepository.deleteById(clientId);
        return clientId;
    }

    public void uploadProfilePicture(MultipartFile file, Authentication connectedUser, Integer clientId) {
        Client client = clientRepository.findById(clientId).orElseThrow(()-> new EntityNotFoundException("Entity not found"));
        User user = (User) connectedUser.getPrincipal();

        var clientPhoto = fileStorageService.saveFile(file, user.getId());
        client.getPersonalData().setPhoto(clientPhoto);
        clientRepository.save(client);
    }
}
