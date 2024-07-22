package com.personaltrainer.physicaltest.strength;

import org.springframework.stereotype.Service;

@Service
public class StrengthTestMapper {

    public StrengthTest toEntity(StrengthTestRequest request){
        return  new StrengthTest(request);
    }

    public StrengthTestResultResponse toResultResponse(StrengthTest test){
        return new StrengthTestResultResponse(test);
    }

}
