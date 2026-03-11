package com.example.brisa.models.exam;

import com.example.brisa.models.KnowledgeAreaModel;

import jakarta.persistence.*;
import lombok.Data;

// questão da prova
@Data
@Entity
@Table(name = "exam_questions")
public class ExamQuestionModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "exam_id", nullable = false)
    private ExamModel exam; // Prova

    @Column(name = "question_number", nullable = false)
    private Integer questionNumber; // numero_questão

    @ManyToOne
    @JoinColumn(name = "subject_id")
    private KnowledgeAreaModel subject; // área de conhecimento

    @Column(name = "points")
    private Double points; // Pontuação da questão
}
