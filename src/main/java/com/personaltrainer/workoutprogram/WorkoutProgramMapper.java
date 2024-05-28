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

    public WorkoutProgramResponse toWorkoutProgramResponse(WorkoutProgram workoutProgram) {
        return WorkoutProgramResponse.builder()
                .id(workoutProgram.getId())
                .title(workoutProgram.getTitle())
                .inicialDate(workoutProgram.getInicialDate())
                .endDate(workoutProgram.getEndDate())
                .trainingSessionContent(workoutProgram.getTrainingSessionContent())
                .note(workoutProgram.getNote())
                .build();
    }
}
