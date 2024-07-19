package com.personaltrainer.physicaltest.coopertest;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CooperTestResponse {

    private String result;

    public CooperTestResponse(CooperTest test) {
        this.result = test.getVo2MaxResult();
    }
}
