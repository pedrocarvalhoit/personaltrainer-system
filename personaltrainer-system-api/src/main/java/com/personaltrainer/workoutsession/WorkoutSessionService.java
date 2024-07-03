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

    /*This is the method used
    on the monthly workout summary */
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

    /*This is the method used on Actual Month
     Client page for ws stats on client-dashboard*/
    public WorkoutSessionClientActualMonthSummaryResponse getActualMonthSessionStats(Authentication authentication,
                                                                                     Integer clientId){
        User user = (User) authentication.getPrincipal();

        List<WorkoutSession> sessionsActualMonth = workoutSessionRepository.findTotalMonthlySessionsByUserId(user.getId())
                .stream()
                .filter(workoutSession -> workoutSession.getClient().getId().equals(clientId))
                .toList();

        List<WorkoutSession> executedSessionActualMonth = workoutSessionRepository.findTotalMonthlyExecutedSessionsByUserId(user.getId())
                .stream()
                .filter(workoutSession -> workoutSession.getClient().getId().equals(clientId))
                .toList();

        List<WorkoutSession> notExecutedSessionActualMonth = workoutSessionRepository.findTotalMonthlyNotExecutedSessionsByUserId(user.getId())
                .stream()
                .filter(ws -> ws.getClient().getId().equals(clientId))
                .toList();

        int totalSessions = sessionsActualMonth.size();
        int executedSessions = executedSessionActualMonth.size();
        int notExecutedSessions = notExecutedSessionActualMonth.size();

        double percentExecuted = totalSessions == 0 ? 0 : (double) executedSessions / totalSessions * 100;
        double percentNotExecuted = totalSessions == 0 ? 0 : (double) notExecutedSessions / totalSessions * 100;

        return WorkoutSessionClientActualMonthSummaryResponse.builder()
                .totalSessionsActualMonth(sessionsActualMonth.size())
                .totalExecutedSessionsActualMonth(executedSessionActualMonth.size())
                .totalNotExecutedSessionsActualMonth(notExecutedSessionActualMonth.size())
                .percentExecuted(percentExecuted)
                .percentNotExecuted(percentNotExecuted)
                .build();
    }

    /*This is the method used on Monthly Avarage
     Client page for ws stats on client-dashboard*/
    public WorkoutSessionClientAllTimeSummaryResponse getAllTimeSessionStats(Integer clientId) {

        List<WorkoutSession> sessionsList = workoutSessionRepository.findAllByClientId(clientId);
        List<WorkoutSession> executedSessionsList = workoutSessionRepository.findAllByExecutedIsTrueAndClientId(clientId);
        List<WorkoutSession> notExecutedSessionsList = workoutSessionRepository.findAllByExecutedIsFalseAndClientId(clientId);

        int sessionsAmount = sessionsList.size();
        int executedSessionAmount = executedSessionsList.size();
        int notExecutedSessionAmount = notExecutedSessionsList.size();

        double percentExecuted = sessionsAmount == 0 ? 0 : (double) executedSessionAmount / sessionsAmount * 100;
        double percentNotExecuted = sessionsAmount == 0 ? 0 : (double) notExecutedSessionAmount / sessionsAmount * 100;

        String formattedPExecuted = String.format(Locale.US, "%.2f", percentExecuted);
        String formattedPNotExecuted = String.format(Locale.US,"%.2f", percentNotExecuted);

        return WorkoutSessionClientAllTimeSummaryResponse.builder()
                .totalSessions(sessionsAmount)
                .totalExecutedSessions(executedSessionAmount)
                .totalNotExecutedSessions(notExecutedSessionAmount)
                .percentExecuted(Double.parseDouble(formattedPExecuted))
                .percentNotExecuted(Double.parseDouble(formattedPNotExecuted))
                .build();
    }

    public Integer delete(Integer id) {
        workoutSessionRepository.deleteById(id);
        return id;
    }

    /*This is the method used on
     Upcoming Workout Sessions (5 days) on pt-dashboard */
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
