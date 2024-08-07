package com.personaltrainer.workoutsession;

import com.personaltrainer.client.Client;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "workout_session")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
@EntityListeners(AuditingEntityListener.class)
public class WorkoutSession {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "client_id")
    private Client client;

    private String workoutProgramName;

    private LocalDate sessionDate;
    private LocalTime sessionTime;

    private Integer clientSubjectEffort;
    private Integer pTQualityEffortIndicative;

    private boolean executed;

    public void markAsExecuted() {
        this.executed = true;
    }
}
