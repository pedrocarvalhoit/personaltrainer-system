package com.personaltrainer.client;

import com.personaltrainer.Constants;
import com.personaltrainer.common.BaseEntity;
import com.personaltrainer.inicialassessment.InicialAssessment;
import com.personaltrainer.personaldata.PersonalData;
import com.personaltrainer.physicaltest.coopertest.CooperTest;
import com.personaltrainer.physicaltest.coopertest.CooperTestClassification;
import com.personaltrainer.physicaltest.strengthtest.StrengthTest;
import com.personaltrainer.user.User;
import com.personaltrainer.workoutprogram.WorkoutProgram;
import com.personaltrainer.workoutsession.WorkoutSession;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "clients")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
public class Client extends BaseEntity{

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User personalTrainer;

    @Embedded
    private PersonalData personalData;

    @OneToMany(mappedBy = "client", cascade = CascadeType.ALL)
    private List<WorkoutProgram> workoutProgram;

    @OneToMany(mappedBy = "client", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<WorkoutSession> workoutSession;

    @OneToMany(mappedBy = "client", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<CooperTest> cooperTest;

    @Enumerated(EnumType.STRING)
    private CooperTestClassification cooperTestClassification;

    @OneToMany(mappedBy = "client", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<StrengthTest> strengthTest;

    @OneToMany(mappedBy = "client", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<InicialAssessment> inicialAssessments;

    @Transient
    public String getImagePath(){
        return Constants.S3_BASE_URL + "/client-photos/" + this.getId() + "/" + this.getPersonalData().getPhoto();
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Client client = (Client) o;
        return Objects.equals(this.getId(), client.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId());
    }
}
