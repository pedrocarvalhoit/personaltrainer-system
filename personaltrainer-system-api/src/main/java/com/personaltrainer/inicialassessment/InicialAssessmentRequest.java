package com.personaltrainer.inicialassessment;

public record InicialAssessmentRequest(

        Integer restingHeartRate,
        Integer maxHeartRate,
        Integer sistolicBloodPressure,
        Integer diastolicBloodPressure

) {
}
