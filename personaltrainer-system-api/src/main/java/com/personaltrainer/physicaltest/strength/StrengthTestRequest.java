package com.personaltrainer.physicaltest.strength;

public record StrengthTestRequest(
        Double maxLoad,

        Exercise exercise
) {
}
