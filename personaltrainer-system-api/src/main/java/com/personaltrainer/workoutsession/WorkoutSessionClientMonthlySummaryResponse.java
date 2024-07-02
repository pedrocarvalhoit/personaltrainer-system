package com.personaltrainer.workoutsession;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class WorkoutSessionClientMonthlySummaryResponse {
    private Integer totalSessionsActualMonth;
    private Integer totalExecutedSessionsActualMonth;
    private Integer totalNotExecutedSessionsActualMonth;

    private long percentualExecuted;
    private long sessionsMonthlyPercentual;

}
