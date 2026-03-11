package com.example.brisa.models.exam;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.*;
import lombok.Data;

// prova
@Data
@Entity
@Table(name = "exams")
public class ExamModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name; // cod_prova

    @Column(name = "exam_date")
    private LocalDate examDate; // data_prova

    @OneToMany(mappedBy = "exam", cascade = CascadeType.ALL)
    private Set<ExamQuestionModel> questions =  new HashSet<>(); // Questões da prova

}
