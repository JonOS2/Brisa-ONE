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

@Data
@Entity
@Table(name = "classes")
public class ClassModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String code; // Código da Turma

    @ManyToOne
    @JoinColumn(name = "program_id", nullable = false)
    private ProgramModel program;

    @Column(name = "start_date")
    private LocalDate startDate;
    
    @Column(name = "end_date")
    private LocalDate endDate;

    @ManyToOne
    @JoinColumn(name = "location_id")
    private InstitutionModel location;
    // a turma que tem o local
    

    @Column(name = "default_selection_capacity")
    private Integer defaultSelectionCapacity = 350;

    @Column(name = "default_leveling_capacity")
    private Integer defaultLevelingCapacity = 250;

    @Column(name = "default_immersion_capacity")
    private Integer defaultImmersionCapacity = 50;

    @Column(name = "immersion_team_size")
    private Integer immersionTeamSize = 5;

    @Column(name = "qtd_vagas")
    private Integer qtdVagas;


}
