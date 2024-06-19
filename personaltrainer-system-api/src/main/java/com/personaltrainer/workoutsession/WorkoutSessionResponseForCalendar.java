package com.personaltrainer.workoutsession;

import lombok.*;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class WorkoutSessionResponseForCalendar {

    private LocalDate sessionDate;
    private LocalTime sessionTime;
    private String clientName;

}
