package com.personaltrainer.physicaltest;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "strength_test")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class StrengthTest extends PhsysicalTest{

    private Double load;

    private Integer repetitions;

}
