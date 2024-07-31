package com.personaltrainer.physicaltest.coopertest;

import org.springframework.stereotype.Service;

@Service
public class CooperTestMapper {

    public CooperTestResultResponse toResultResponse(CooperTest cooperTest) {
        return new CooperTestResultResponse(cooperTest);
    }

    public CooperTestHistoryResponse toHistoryResponse(CooperTest cooperTest){
        return new CooperTestHistoryResponse(cooperTest);
    }

    public CooperTestClassificationResponse toClassificationResponse(CooperTestClassification classification) {
        return new CooperTestClassificationResponse(classification.name());
    }
}
