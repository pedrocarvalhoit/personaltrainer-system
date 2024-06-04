package com.personaltrainer.workoutsession;

import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class WorkoutSessionResponse {

    private String workoutProgramName;
    private LocalDate sessionDate;
    private Integer clientSubjectEffort;
    private Integer pTQualityEffortIndicative;
    private boolean executed;

}
