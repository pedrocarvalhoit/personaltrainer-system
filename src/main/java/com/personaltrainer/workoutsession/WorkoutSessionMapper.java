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


}
