package com.personaltrainer.client;

import com.personaltrainer.common.BaseEntity;
import com.personaltrainer.user.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.util.List;

@Entity(name = "clients")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
public class Client extends BaseEntity{

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "client", cascade = CascadeType.ALL)
    private List<WorkoutProgram> workoutProgram;

    @OneToMany(mappedBy = "client", cascade = CascadeType.ALL)
    private List<WorkoutSession> workoutSession;


}