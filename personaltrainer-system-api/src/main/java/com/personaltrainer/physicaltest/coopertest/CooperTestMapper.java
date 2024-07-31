package com.personaltrainer.physicaltest.coopertest;

import org.springframework.stereotype.Service;

import java.util.Locale;

@Service
public class CooperTestMapper {

    public CooperTestResultResponse toResultResponse(CooperTest cooperTest) {
        String formattedResult = String.format(Locale.US, "%.2f", cooperTest.getVo2Max());
        return new CooperTestResultResponse(Double.parseDouble(formattedResult));
    }

    public CooperTestHistoryResponse toHistoryResponse(CooperTest cooperTest){
        return new CooperTestHistoryResponse(cooperTest);
    }

    public CooperTestClassificationResponse toClassificationResponse(CooperTestClassification classification) {
        return new CooperTestClassificationResponse(classification.name());
    }
}
