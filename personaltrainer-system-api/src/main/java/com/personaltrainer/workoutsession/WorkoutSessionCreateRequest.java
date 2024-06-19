package com.personaltrainer.workoutsession;

import jakarta.validation.Valid;

import java.time.LocalDate;
import java.time.LocalTime;

public record WorkoutSessionCreateRequest(

        @Valid
        String workoutProgramName,

        @Valid
        LocalDate sessionDate,

        @Valid
        LocalTime sessionTime,

        @Valid
        Integer clientSubjectEffort,

        @Valid
        Integer pTQualityEffortIndicative
) {
}
