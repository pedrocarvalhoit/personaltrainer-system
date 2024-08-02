package com.personaltrainer.physicaltest.strengthtest;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StrengthTestMapper {

    public StrengthTest toEntity(StrengthTestRequest request){
        return  new StrengthTest(request);
    }

    public StrengthTestResultResponse toResultResponse(StrengthTest test){
        return new StrengthTestResultResponse(test);
    }

    public ExercisesResponse toExerciseResponse(List<String> exercises) {
        return ExercisesResponse.builder()
                .exercises(exercises)
                .build();
    }
}
