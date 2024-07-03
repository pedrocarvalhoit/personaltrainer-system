package com.personaltrainer.workoutsession;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
/*This clas is used to see data from session for this actual month */
public class WorkoutSessionClientActualMonthSummaryResponse {
    private Integer totalSessionsActualMonth;
    private Integer totalExecutedSessionsActualMonth;
    private Integer totalNotExecutedSessionsActualMonth;

    private double percentExecuted;
    private double percentNotExecuted;

}
