package com.personaltrainer.workoutprogram;

import com.personaltrainer.client.Client;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.List;

@Entity(name = "workout_program")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class WorkoutProgram {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    private Client client;

    private LocalDate inicialDate;
    private LocalDate endDate;

    private String title;

    private String trainingSessionContent;

    private List<String> notes;


}
