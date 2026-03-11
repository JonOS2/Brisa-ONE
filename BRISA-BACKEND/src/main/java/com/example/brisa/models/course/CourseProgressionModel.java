package com.example.brisa.models.course;

import java.time.LocalDate;

import com.example.brisa.models.PeopleModel;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;


@Data
@Entity
@Table(name = "course_progressions")
public class CourseProgressionModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "course_id")
    private CourseModel course; // id do curso

    @ManyToOne
    @JoinColumn(name = "people_id") 
    private PeopleModel people; // id da pessoa

    @Column(name = "date")
    private LocalDate date; // data que foi feita a medição

    @Column(name = "completion_percentage")
    private double completionPercentage; // percentual de conclusão do curso
    
    private String status; // concluído, em andamento, não iniciado
}
