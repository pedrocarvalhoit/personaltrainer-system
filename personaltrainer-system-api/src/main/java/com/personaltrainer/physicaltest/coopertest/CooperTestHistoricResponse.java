package com.personaltrainer.physicaltest.coopertest;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.time.format.TextStyle;
import java.util.Locale;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CooperTestHistoricResponse {

    private String month;

    private Double result;

    public CooperTestHistoricResponse(CooperTest test) {
        this.month = test.getCreatedAt().getMonth().getDisplayName(TextStyle.SHORT, Locale.ENGLISH);
        this.result = test.getVo2Max();
    }
}
