package com.personaltrainer.user;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Entity()
@Getter
@Setter
public class PeronalData {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Integer id;

    @Column(name = "first_name", length = 45, nullable = false)
    private String firstName;

    @Column(name = "last_name", length = 45, nullable = false)
    private String lastName;

    @Column(length = 128, nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private LocalDate dateOfBirth;

    @Column(length = 30, nullable = false, unique = true)
    private String mobile;

    @Column(nullable = false)
    private String gender;

    private boolean enabled;

    private String getFullName(){
        return firstName + " " + lastName;
    }
}
