package com.personaltrainer.workoutsession;

import com.personaltrainer.client.Client;
import com.personaltrainer.client.ClientRepository;
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

import java.util.*;

@Service
@RequiredArgsConstructor
public class WorkoutSessionService {

    private final WorkoutSessionRepository workoutSessionRepository;

    private final ClientRepository clientRepository;

    private final WorkoutSessionMapper mapper;

    public Integer save(WorkoutSessionCreateRequest createWSRequest, Integer clientId) {
        Client client = clientRepository.findById(clientId).orElseThrow(()-> new RuntimeException("Client not found"));
        WorkoutSession workoutSession = mapper.toWorkoutSession(createWSRequest);
        workoutSession.setClient(client);

        return workoutSessionRepository.save(workoutSession).getId();
    }

    public PageResponse<WorkoutSessionResponse> listAllByClient(int page, int size, Integer clientId) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("sessionDate").ascending());
        Page<WorkoutSession> workoutSessions = workoutSessionRepository.findAllByClientId(pageable, clientId);
        List<WorkoutSessionResponse> workoutSessionsResponse = workoutSessions
                .stream()
                .map(mapper::toWorkoutSessionResponse)
                .toList();

        return new PageResponse<>(workoutSessionsResponse, workoutSessions.getNumber(), workoutSessions.getSize(),
                workoutSessions.getTotalElements(), workoutSessions.getTotalPages(), workoutSessions.isFirst(),
                workoutSessions.isLast());
    }

    public Integer execute(Integer sessionId, Authentication authenticatedUser) {
        User user = (User) authenticatedUser.getPrincipal();
        WorkoutSession workoutSession = workoutSessionRepository.findById(sessionId)
                .orElseThrow(()->new EntityNotFoundException("Workout session not found"));

        if (!Objects.equals(workoutSession.getClient().getPersonalTrainer().getId(), user.getId())) {
            throw new OperationNotPermitedException("This session don´t belong to your client");
        }

        workoutSession.markAsExecuted();
        return workoutSessionRepository.save(workoutSession).getId();
    }

    public WorkoutSessionTotalSummaryResponse getToalSesssionsSummary(Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        //totalsessions
        List<WorkoutSession> monthSessionsList= workoutSessionRepository.findSessionsByUserId(user.getId());
        Integer monthTotalSessions = monthSessionsList.size();

        //get top clients names by workoutsessions
        Pageable pageable = PageRequest.of(0, 3);
        List<String> clientsNames = clientRepository.findTop3ClientsNamesWithMostSessions(user.getId(), pageable);

        //get top clients sessions quantity
        List<Integer> clientsSessionsQuantity = clientRepository.findTop3SessionsQuantityPerTop3Clients(user.getId(), pageable);

        // Retorna o objeto de resposta com o resumo das sessões
        return WorkoutSessionTotalSummaryResponse.builder()
                .totalSessionsPerMonth(monthTotalSessions)
                .bestThreeClients(clientsNames)
                .bestThreeClientsNumOfSessions(clientsSessionsQuantity)
                .build();
    }

    public Integer delete(Integer id) {
        workoutSessionRepository.deleteById(id);
        return id;
    }
}
