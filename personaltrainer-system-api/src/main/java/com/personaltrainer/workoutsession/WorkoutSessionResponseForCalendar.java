package com.personaltrainer.workoutsession;

import lombok.*;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class WorkoutSessionResponseForCalendar {

    private Integer id;
    private String clientName;
    private LocalDate sessionDate;
    private LocalTime sessionTime;
    private Integer clientSubjectEffort;
    private Integer pTQualityEffortIndicative;
    private String workoutProgramName;
    private boolean executed;

}
