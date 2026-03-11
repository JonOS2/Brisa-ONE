package com.example.brisa.models.exam;


import com.example.brisa.models.PeopleModel;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "exam_answers")
public class ExamAnswerModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "people_id", nullable = false)
    private PeopleModel people; // O aluno que respondeu

    @ManyToOne
    @JoinColumn(name = "exam_question_id", nullable = false)
    private ExamQuestionModel examQuestion; // A questão respondida

    @Column(name = "is_correct")
    private Boolean isCorrect; // true = acertou, false = errou

    @Column(name = "answer_text", columnDefinition = "TEXT")
    private String answerText; // Resposta do aluno(precisamos rever se esse campo é necessário)

    @Column(name = "points_earned")
    private Double pointsEarned; // Pontos obtidos nesta questão
}