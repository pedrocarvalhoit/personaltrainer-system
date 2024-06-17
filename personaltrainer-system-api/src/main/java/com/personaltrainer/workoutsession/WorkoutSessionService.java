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
import java.util.stream.Collectors;

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
        Integer totalSessions = workoutSessionRepository.findSessionsByUserId(user.getId()).size();

        //get all clients for the logged user
        List<Client> clients = clientRepository.findAllByPersonalTrainerId(user.getId());
        HashMap<String, Integer> sessionsRank = new HashMap<>();
        clients.forEach(client -> {
            sessionsRank.put(client.getPersonalData().getFullName(),
                    workoutSessionRepository.countSessionsInCurrentMonthByClientId(client.getId()));
        });
        //get this clients sessions in actual month
        // Ordena o mapa por número de sessões em ordem decrescente
        List<Map.Entry<String, Integer>> sortedEntries = sessionsRank.entrySet().stream()
                .sorted(Map.Entry.comparingByValue(Comparator.reverseOrder()))
                .limit(3)
                .collect(Collectors.toList());

        // Extrai os top 3 clientes com mais sessões
        List<String> topThreeClients = sortedEntries.stream()
                .map(Map.Entry::getKey)
                .collect(Collectors.toList());

        // Retorna o objeto de resposta com o resumo das sessões
        return WorkoutSessionTotalSummaryResponse.builder()
                .totalSessionsPerMonth(totalSessions)
                .bestThreeClients(topThreeClients)
                .build();
    }
}
