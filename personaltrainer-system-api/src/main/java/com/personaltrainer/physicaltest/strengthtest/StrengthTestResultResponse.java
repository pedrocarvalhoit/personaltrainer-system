package com.personaltrainer.physicaltest.strengthtest;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StrengthTestResultResponse {

    private Double maxLoad;

    private Double max1Rm;

    private Exercise exercise;

    public StrengthTestResultResponse(StrengthTest test) {
        this.maxLoad = test.getMaxLoad();
        this.max1Rm = test.getMax1Rm();
        this.exercise = test.getExercise();
    }
}
