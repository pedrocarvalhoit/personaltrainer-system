package com.personaltrainer.workoutsession;

import jakarta.validation.Valid;

import java.time.LocalDate;

public record WorkoutSessionCreateRequest(

        @Valid
        String workoutProgramName,

        @Valid
        LocalDate sessionDate,

        @Valid
        Integer clientSubjectEffort,

        @Valid
        Integer pTQualityEffortIndicative
) {
}
