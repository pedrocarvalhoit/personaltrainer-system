package com.personaltrainer.workoutsession;

import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class WorkoutSessionTotalSummaryResponse {
    private Integer totalSessionsPerMonth;
    private Integer totalExecutedSessionsPerMonth;
    private Integer totalNotExecutedSessionsPerMonth;
    private List<String> bestThreeClients;
    private List<Integer> bestThreeClientsNumOfSessions;
}
