package com.personaltrainer.physicaltest;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "physical_tests")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
abstract class PhsysicalTest {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Integer id;

    @NotNull
    @NotBlank
    private String exercise;

    private Integer restingHeartHate;

    private Integer sistolicBloodPressure;

    private Integer diastolicBloodPressure;
}
