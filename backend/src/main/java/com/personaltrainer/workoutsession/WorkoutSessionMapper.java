package com.personaltrainer.workoutsession;

import org.springframework.stereotype.Service;

@Service
public class WorkoutSessionMapper {

    public WorkoutSession toWorkoutSession(WorkoutSessionCreateRequest request) {
        return WorkoutSession.builder()
                .workoutProgramName(request.workoutProgramName())
                .sessionDate(request.sessionDate())
                .clientSubjectEffort(request.clientSubjectEffort())
                .pTQualityEffortIndicative(request.pTQualityEffortIndicative())
                .build();
    }


    public WorkoutSessionResponse toWorkoutSessionResponse(WorkoutSession workoutSession) {
        return WorkoutSessionResponse.builder()
                .workoutProgramName(workoutSession.getWorkoutProgramName())
                .sessionDate(workoutSession.getSessionDate())
                .clientSubjectEffort(workoutSession.getClientSubjectEffort())
                .pTQualityEffortIndicative(workoutSession.getPTQualityEffortIndicative())
                .executed(workoutSession.isExecuted())
                .build();
    }
}
