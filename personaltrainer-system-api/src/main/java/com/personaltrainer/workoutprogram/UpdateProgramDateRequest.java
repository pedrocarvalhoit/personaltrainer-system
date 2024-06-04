package com.personaltrainer.workoutprogram;

import java.time.LocalDate;

public record UpdateProgramDateRequest(
        LocalDate startDate,

        LocalDate endDate
) {
}
