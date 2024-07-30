package com.personaltrainer.physicaltest.coopertest;

import org.springframework.stereotype.Service;

@Service
public class CooperTestMapper {

    public CooperTestResultResponse toResponse(CooperTest cooperTest) {
        return new CooperTestResultResponse(cooperTest);
    }

    public CooperTestHistoricResponse toHistoricResponse(CooperTest cooperTest){
        return new CooperTestHistoricResponse(cooperTest);
    }

}
