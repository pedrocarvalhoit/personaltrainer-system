package com.personaltrainer.workoutsession;

import com.personaltrainer.client.ClientRepository;
import org.springframework.stereotype.Service;

@Service
public class WorkoutSessionMapper {

    public WorkoutSession toWorkoutSession(CreateWorkoutSessionRequest request) {

        return WorkoutSession.builder()
                .workoutProgramName(request.workoutProgramName())
                .sessionDate(request.sessionDate())
                .clientSubjectEffort(request.clientSubjectEffort())
                .pTQualityEffortIndicative(request.pTQualityEffortIndicative())
                .build();
    }


}
