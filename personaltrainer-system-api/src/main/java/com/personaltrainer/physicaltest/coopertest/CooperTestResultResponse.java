package com.personaltrainer.physicaltest.coopertest;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CooperTestResultResponse {

    private String result;

    public CooperTestResultResponse(CooperTest test) {
        this.result = test.getVo2MaxResult();
    }
}
