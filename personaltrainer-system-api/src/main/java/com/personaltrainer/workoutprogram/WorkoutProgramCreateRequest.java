package com.personaltrainer.workoutprogram;

import java.time.LocalDate;

public record WorkoutProgramCreateRequest(

        String title,

        LocalDate inicialDate,

        LocalDate endDate,

        String trainingSessionContent,

        String note,

        boolean enabled
) {
}
