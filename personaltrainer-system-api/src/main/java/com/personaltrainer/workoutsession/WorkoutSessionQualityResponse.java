package com.personaltrainer.workoutsession;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
/*This clas is used to see avarage stats for training sessions quality */
public class WorkoutSessionQualityResponse {

    private String month;
    private double clientSubjectEffortAvarage;
    private double ptQualityEffortAvarage;

}
