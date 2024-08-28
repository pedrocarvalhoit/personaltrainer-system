package com.personaltrainer.physicaltest.strengthtest;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ExerciseStatsResponse {

    private String month;
    private double maxLoadAvarage;
    private double maxLoad;
    private double max1Rm;

}
