package com.personaltrainer.physicaltest.strengthtest;

public record StrengthTestRequest(
        Double maxLoad,

        Exercise exercise
) {
}
