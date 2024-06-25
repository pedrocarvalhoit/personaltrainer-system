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

import java.time.LocalDate;
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

        //totalSession
        List<WorkoutSession> totalSessionPerMonthList = workoutSessionRepository.findTotalMonthlySessionsByUserId(user.getId());
        Integer totalSessionPerMonth = totalSessionPerMonthList.size();

        //totalExecutedSessions
        List<WorkoutSession> monthExecutedSessionsList= workoutSessionRepository.findTotalMonthlyExecutedSessionsByUserId(user.getId());
        Integer monthTotalExecutedSessions = monthExecutedSessionsList.size();

        //totalNotExecutedSessions
        List<WorkoutSession> monthNotExecutedSessionsList= workoutSessionRepository.findTotalMonthlyNotExecutedSessionsByUserId(user.getId());
        Integer monthTotalNotExecutedSessions = monthNotExecutedSessionsList.size();

        //get top clients names by workoutsessions
        Pageable pageable = PageRequest.of(0, 3);
        List<String> clientsNames = clientRepository.findTop3ClientsNamesWithMostSessions(user.getId(), pageable);

        //get top clients sessions quantity
        List<Integer> clientsSessionsQuantity = clientRepository.findTop3SessionsQuantityPerTop3Clients(user.getId(), pageable);

        // Retorna o objeto de resposta com o resumo das sessões
        return WorkoutSessionTotalSummaryResponse.builder()
                .totalSessionsPerMonth(totalSessionPerMonth)
                .totalExecutedSessionsPerMonth(monthTotalExecutedSessions)
                .totalNotExecutedSessionsPerMonth(monthTotalNotExecutedSessions)
                .bestThreeClients(clientsNames)
                .bestThreeClientsNumOfSessions(clientsSessionsQuantity)
                .build();
    }

    public Integer delete(Integer id) {
        workoutSessionRepository.deleteById(id);
        return id;
    }

    public List<WorkoutSessionResponseForCalendar> getSessionsForNextWeek(Authentication authentication) {
        User user = (User) authentication.getPrincipal();

        LocalDate startDate = LocalDate.now();
        LocalDate endDate = startDate.plusDays(5);
        List<WorkoutSession> workoutSessions = workoutSessionRepository.findSessionsForNextWeek(startDate, endDate, user.getId());

        return workoutSessions.stream()
                .map(mapper :: toWorkoutSessionCalendarResponse)
                .toList();
    }

    public List<WorkoutSessionResponseForCalendar> getAllSessionsForCalendar(Authentication authentication) {
        User user = (User) authentication.getPrincipal();

        List<WorkoutSession> workoutSessions = workoutSessionRepository.findSessionsByDate(user.getId());

        return workoutSessions.stream()
                .map(mapper :: toWorkoutSessionCalendarResponse)
                .toList();
    }

    public Integer updateEfforts(Authentication authentication, Integer sessionId, WorkoutSessioUpdateEffortsRequest request) {
        User user = (User) authentication.getPrincipal();
        WorkoutSession workoutSession = workoutSessionRepository.findById(sessionId)
                .orElseThrow(() -> new EntityNotFoundException("Session not found"));
        if (!Objects.equals(workoutSession.getClient().getPersonalTrainer().getId(), user.getId())){
            throw new OperationNotPermitedException("This session don´t belong to you client");
        }

        mapper.toUpdateEffort(workoutSession, request);
        workoutSessionRepository.save(workoutSession);

        return sessionId;
    }
}
