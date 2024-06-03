package com.personaltrainer.workoutprogram;

import org.springframework.stereotype.Service;

@Service
public class WorkoutProgramMapper {

    public WorkoutProgram toWorkoutProgram(WorkoutProgramCreateRequest request){
        return WorkoutProgram.builder()
                .title(request.title())
                .startDate(request.inicialDate())
                .endDate(request.endDate())
                .trainingSessionContent(request.trainingSessionContent())
                .note(request.note())
                .enabled(request.enabled())
                .build();
    }

    public WorkoutProgramResponse toWorkoutProgramResponse(WorkoutProgram workoutProgram) {
        return WorkoutProgramResponse.builder()
                .id(workoutProgram.getId())
                .title(workoutProgram.getTitle())
                .startDate(workoutProgram.getStartDate())
                .endDate(workoutProgram.getEndDate())
                .trainingSessionContent(workoutProgram.getTrainingSessionContent())
                .note(workoutProgram.getNote())
                .enabled(workoutProgram.isEnabled())
                .build();
    }

    public void toUpdateProgram(WorkoutProgram workoutProgram,UpdateProgramDateRequest request) {
        if (request.startDate() != null){
            workoutProgram.setStartDate(request.startDate());
        }
        if (request.endDate() != null){
            workoutProgram.setEndDate(request.endDate());
        }
    }
}
