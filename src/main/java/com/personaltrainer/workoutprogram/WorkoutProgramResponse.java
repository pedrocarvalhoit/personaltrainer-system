package com.personaltrainer.workoutprogram;

import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class WorkoutProgramResponse {

    private Integer id;

    private String title;

    private LocalDate startDate;
    private LocalDate endDate;

    private String trainingSessionContent;

    private String note;

    private boolean enabled;

}
