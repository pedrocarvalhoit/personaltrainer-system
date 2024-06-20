package com.personaltrainer.workoutsession;

import org.springframework.stereotype.Service;

@Service
public class WorkoutSessionMapper {

    public WorkoutSession toWorkoutSession(WorkoutSessionCreateRequest request) {
        return WorkoutSession.builder()
                .workoutProgramName(request.workoutProgramName())
                .sessionDate(request.sessionDate())
                .sessionTime(request.sessionTime())
                .clientSubjectEffort(request.clientSubjectEffort())
                .pTQualityEffortIndicative(request.pTQualityEffortIndicative())
                .build();
    }


    public WorkoutSessionResponse toWorkoutSessionResponse(WorkoutSession workoutSession) {
        return WorkoutSessionResponse.builder()
                .workoutProgramName(workoutSession.getWorkoutProgramName())
                .sessionDate(workoutSession.getSessionDate())
                .sessionTime(workoutSession.getSessionTime())
                .clientSubjectEffort(workoutSession.getClientSubjectEffort())
                .pTQualityEffortIndicative(workoutSession.getPTQualityEffortIndicative())
                .executed(workoutSession.isExecuted())
                .build();
    }

    public WorkoutSessionResponseForCalendar toWorkoutSessionCalendarResponse(WorkoutSession workoutSession) {
        return WorkoutSessionResponseForCalendar.builder()
                .clientName(workoutSession.getClient().getPersonalData().getFullName())
                .id(workoutSession.getId())
                .sessionDate(workoutSession.getSessionDate())
                .sessionTime(workoutSession.getSessionTime())
                .clientSubjectEffort(workoutSession.getClientSubjectEffort())
                .pTQualityEffortIndicative(workoutSession.getPTQualityEffortIndicative())
                .executed(workoutSession.isExecuted())
                .build();
    }
}
