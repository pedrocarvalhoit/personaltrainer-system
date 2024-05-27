package com.personaltrainer.workoutprogram;

import org.springframework.stereotype.Service;

@Service
public class WorkoutProgramMapper {

    public WorkoutProgram toWorkoutProgram(WorkoutProgramCreateRequest request){
        return WorkoutProgram.builder()
                .title(request.title())
                .inicialDate(request.inicialDate())
                .endDate(request.endDate())
                .trainingSessionContent(request.trainingSessionContent())
                .note(request.note())
                .build();
    }

}
