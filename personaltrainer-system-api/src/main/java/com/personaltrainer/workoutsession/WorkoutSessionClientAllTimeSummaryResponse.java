package com.personaltrainer.workoutsession;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
// This clas is used on all time stats for clients
public class WorkoutSessionClientAllTimeSummaryResponse {
    private Integer totalSessions;
    private Integer totalExecutedSessions;
    private Integer totalNotExecutedSessions;

    private double percentExecuted;
    private double percentNotExecuted;

}
