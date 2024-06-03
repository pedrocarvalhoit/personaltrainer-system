package com.personaltrainer.workoutprogram;

import com.personaltrainer.client.Client;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.time.LocalDate;

@Entity(name = "workout_program")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
public class WorkoutProgram {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    private Client client;

    private String title;

    private LocalDate startDate;
    private LocalDate endDate;

    private String trainingSessionContent;

    private String note;

    private boolean enabled;

}
