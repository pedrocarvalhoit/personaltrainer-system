package com.personaltrainer.workoutsession;

import java.time.LocalDate;
import java.time.LocalTime;

public record WorkoutSessioUpdateDataRequest(

        String workoutProgramName,

        LocalDate sessionDate,

        LocalTime sessionTime,

        Integer clientSubjectEffort,

        Integer pTQualityEffortIndicative


) {

}
