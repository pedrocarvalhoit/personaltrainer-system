package com.personaltrainer.client;

import com.personaltrainer.Constants;
import com.personaltrainer.common.BaseEntity;
import com.personaltrainer.personaldata.PersonalData;
import com.personaltrainer.physicaltest.coopertest.CooperTest;
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

    @Transient
    public String getImagePath(){
        return Constants.S3_BASE_URL + "/client-photos/" + this.getId() + "/" + this.getPersonalData().getPhoto();
    }

}
