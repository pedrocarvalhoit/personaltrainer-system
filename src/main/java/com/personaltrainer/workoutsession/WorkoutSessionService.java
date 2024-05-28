package com.personaltrainer.workoutsession;

import com.personaltrainer.client.Client;
import com.personaltrainer.client.ClientRepository;
import com.personaltrainer.common.PageResponse;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

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

    public PageResponse listAllByClient(int page, int size, Integer clientId) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("sessionDate").ascending());
        Page<WorkoutSession> workoutSessions = workoutSessionRepository.findAllByClientId(pageable, clientId);
        List<WorkoutSessionResponse> workoutSessionsResponse = workoutSessions
                .stream()
                .map(mapper::toWorkoutSessionResponse)
                .toList();

        return new PageResponse(workoutSessionsResponse, workoutSessions.getNumber(), workoutSessions.getSize(),
                workoutSessions.getTotalElements(), workoutSessions.getTotalPages(), workoutSessions.isFirst(),
                workoutSessions.isLast());
    }

    public Integer execute(Integer sessionId) {
        WorkoutSession workoutSession = workoutSessionRepository.findById(sessionId)
                .orElseThrow(()->new EntityNotFoundException("Workout session not found"));
        workoutSession.markAsExecuted();

        return workoutSessionRepository.save(workoutSession).getId();
    }


}
