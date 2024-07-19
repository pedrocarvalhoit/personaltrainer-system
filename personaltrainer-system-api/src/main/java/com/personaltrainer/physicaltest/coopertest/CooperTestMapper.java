package com.personaltrainer.physicaltest.coopertest;

import org.springframework.stereotype.Service;

@Service
public class CooperTestMapper {

    public CooperTestResponse toResponse(CooperTest cooperTest) {
        return new CooperTestResponse(cooperTest);
    }

}
