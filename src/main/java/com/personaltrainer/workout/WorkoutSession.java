package com.personaltrainer.workout;

import com.personaltrainer.client.Client;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity(name = "workout_session")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class WorkoutSession {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    private Client client;

    private String workoutProgramName;
    private LocalDate sessionDate;
    private Integer clientSubjectEffort;
    private Integer pTQualityEffortIndicative;
    private boolean executed = false;
}
