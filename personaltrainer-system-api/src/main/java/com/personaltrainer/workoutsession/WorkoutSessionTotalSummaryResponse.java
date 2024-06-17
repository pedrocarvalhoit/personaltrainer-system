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
    private List<String> bestThreeClients;
    private List<Integer> bestThreeClientsNumOfSessions;
}
