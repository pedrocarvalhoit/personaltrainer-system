package com.personaltrainer.role;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.personaltrainer.user.User;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@EntityListeners(AuditingEntityListener.class)//Needs @enableJPAAuditing on app class
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Integer id;

    @Column(unique = true)
    private String name;

    @ManyToMany(mappedBy = "roles")
    @JsonIgnore
    private User user;

    @CreatedDate
    @Column(nullable = false, updatable = false) //Don´t modify on updates
    private LocalDateTime createdDate;

    @LastModifiedDate
    @Column(insertable = false)//Don´t want to modify on create
    private LocalDateTime lastModifiedDate;


}
