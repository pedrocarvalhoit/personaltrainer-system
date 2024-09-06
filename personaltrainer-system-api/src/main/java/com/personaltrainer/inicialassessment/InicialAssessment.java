package com.personaltrainer.inicialassessment;

import com.personaltrainer.client.Client;
import com.personaltrainer.common.BaseEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@Table(name = "inicial_assessment")
@Data
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@Getter
@EntityListeners(AuditingEntityListener.class)
public class InicialAssessment{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @CreatedDate
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "client_id")
    private Client client;

    private Integer restingHeartRate;
    private Integer maxHeartRate;
    private Integer sistolicBloodPressure;
    private Integer diastolicBloodPressure;

    public InicialAssessment(InicialAssessmentRequest request) {
        this.restingHeartRate = request.restingHeartRate();
        this.maxHeartRate = request.maxHeartRate();
        this.sistolicBloodPressure = request.sistolicBloodPressure();
        this.diastolicBloodPressure = request.diastolicBloodPressure();

    }
}
