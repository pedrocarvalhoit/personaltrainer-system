package com.personaltrainer.physicaltest.coopertest;

import com.personaltrainer.client.Client;
import com.personaltrainer.common.BaseEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Entity
@Table(name = "cooper_test")
@Data
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
@Getter
@EntityListeners(AuditingEntityListener.class)
public class CooperTest extends BaseEntity {

    public static final String DESCRIPTION = "Start on the treadmill with no incline, or flat solo ate the street," +
            " and do your best in 12 minuts. Register the total distance.";

    private Double distance;
    private Double vo2Max;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "client_id")
    private Client client;

    public CooperTest (CooperTestRequest request){
        this.distance = request.distance();
        this.vo2Max = CooperTestUtil.calculateVo2Max(request.distance());
    }

}
