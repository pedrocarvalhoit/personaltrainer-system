package com.personaltrainer.client;

import com.personaltrainer.AmazonS3Util;
import com.personaltrainer.common.PageResponse;
import com.personaltrainer.common.UserPermissionOverClientCheck;
import com.personaltrainer.file.FileStorageService;
import com.personaltrainer.user.User;
import com.personaltrainer.workoutsession.WorkoutSessionRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class ClientService {

    private final ClientRepository clientRepository;
    private final WorkoutSessionRepository workoutSessionRepository;
    private final ClientMapper clientMapper;
    private final UserPermissionOverClientCheck permition;
    private final FileStorageService fileStorageService;


    public Integer save(ClientSaveRequest request, Authentication connectedUser, MultipartFile file) throws IOException {
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());

        User user = ((User) connectedUser.getPrincipal());
        Client client = clientMapper.toClient(request);
        client.setPersonalTrainer(user);
        client.getPersonalData().setPhoto(fileName);
        Client savedClient = clientRepository.save(client);

        String uploadDir = "client-photos/" + savedClient.getId();
        AmazonS3Util.uploadFile(uploadDir, fileName, file.getInputStream());

        return savedClient.getId();
    }

    public String updatePhoto(Authentication authentication, Integer clientId, MultipartFile file) throws IOException {
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());

        Client client = clientRepository.findById(clientId).orElseThrow(()-> new EntityNotFoundException("Entity not found"));
        permition.checkPermition(client, authentication);
        client.getPersonalData().setPhoto(fileName);
        Client savedClient = clientRepository.save(client);

        String uploadDir = "client-photos/" + savedClient.getId();
        AmazonS3Util.removeFolder(uploadDir);
        AmazonS3Util.uploadFile(uploadDir, fileName, file.getInputStream());

        return client.getImagePath();
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

    public Integer deleteClientAndSessions(Integer clientId, Authentication authentication) {
        Client client = clientRepository.findById(clientId).orElseThrow(()-> new EntityNotFoundException("Entity not found"));
        permition.checkPermition(client, authentication);

        String uploadDir = "client-photos/" + clientId;
        AmazonS3Util.removeFolder(uploadDir);

        workoutSessionRepository.deleteAllByClientId(clientId);
        clientRepository.deleteById(clientId);
        return clientId;
    }

}
