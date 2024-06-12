package com.personaltrainer.role;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.personaltrainer.user.User;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.List;

@Entity(name = "roles")
@EntityListeners(AuditingEntityListener.class)//Needs @enableJPAAuditing on app class
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Role {

    @Id
    @GeneratedValue
    private Integer id;

    @Column(unique = true)
    private String name;

    @ManyToMany(mappedBy = "roles")
    @JsonIgnore
    private List<User> user;

    public Role(String name) {
        this.name = name;
    }
}
