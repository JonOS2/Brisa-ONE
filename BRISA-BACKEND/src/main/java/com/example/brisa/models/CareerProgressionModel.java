package com.example.brisa.models;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

// Essa é a classe que vamos usar para representar a progressão de carreira dos alunos.
@Data
@Entity
@Table(name = "career_progressions")
public class CareerProgressionModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "people_id")
    private PeopleModel people;

    @Column(name = "survey_date")
    private LocalDate surveyDate;

    private String status; // empregado, desempregado
    private String company; // empresa onde trabalha
    private String position; // Cargo
    
}
