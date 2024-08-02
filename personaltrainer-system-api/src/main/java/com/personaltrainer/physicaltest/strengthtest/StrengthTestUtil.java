package com.personaltrainer.physicaltest.strengthtest;

public class StrengthTestUtil {

    public static Double calculateRm(Double maxLoad){
        return (0.033 * 10 * maxLoad) + maxLoad;
    }

}