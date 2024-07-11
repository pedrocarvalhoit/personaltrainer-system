package com.personaltrainer.workoutprogram;

import java.time.LocalDate;

public record WorkoutProgramUpdateResquest(
        String title,

        LocalDate startDate,

        LocalDate endDate,

        String trainingSessionContent,

        String note,

        boolean enabled
) {
}
