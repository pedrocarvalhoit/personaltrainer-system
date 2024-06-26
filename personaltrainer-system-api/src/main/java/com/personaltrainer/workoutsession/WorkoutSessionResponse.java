package com.personaltrainer.workoutsession;

import lombok.*;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class WorkoutSessionResponse {

    private String workoutProgramName;
    private LocalDate sessionDate;
    private LocalTime sessionTime;
    private Integer clientSubjectEffort;
    private Integer pTQualityEffortIndicative;
    private boolean executed;

}
