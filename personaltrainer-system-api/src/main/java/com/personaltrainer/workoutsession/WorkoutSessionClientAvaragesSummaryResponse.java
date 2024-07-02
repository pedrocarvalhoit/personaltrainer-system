package com.personaltrainer.workoutsession;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class WorkoutSessionClientAvaragesSummaryResponse {

    private Double avaragePerMonth;
    private Double avarageExecutedPerMonth;
    private Double avarageNotExecutedPerMonth;

}
