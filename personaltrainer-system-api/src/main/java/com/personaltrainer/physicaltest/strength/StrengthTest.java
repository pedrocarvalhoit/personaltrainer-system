package com.personaltrainer.physicaltest.strength;

import com.personaltrainer.client.Client;
import com.personaltrainer.common.BaseEntity;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Entity
@Table(name = "stregth_test")
@Data
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
@EntityListeners(AuditingEntityListener.class)
public class StrengthTest extends BaseEntity {

    private static final String DESCRIPTION = "For a reliable test, do a good specific warm up, and then start." +
            "Perform the chosen exercise for 10 MAX repetitions and register de total load (with the barbell).";

    @NotNull
    private Double maxLoad;

    private Double max1Rm;

    @NotNull
    @Enumerated(EnumType.STRING)
    private Exercise exercise;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "client_id")
    private Client client;

    public StrengthTest(StrengthTestRequest request) {
        this.maxLoad = request.maxLoad();
        this.exercise = request.exercise();
        this.max1Rm = setMax1Rm(request.maxLoad());
    }

    public Double setMax1Rm(Double maxLoad){
        return (0.033 * 10 * maxLoad) + maxLoad;
    }

}
