package com.example.brisa.models;

import jakarta.persistence.*;
import lombok.*;
import java.util.HashSet;
import java.util.Set;

// Model de instituições
@Data
@Entity
@Table(name = "institutions")
public class InstitutionModel{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String code; // não sei bem que código é esse, precisa confirmar se é o id ou outro código
    private String name; // nome da instituição
    private String acronym; // Sigla
    
    @Column(name = "local_coordinator")
    private String localCoordinatorName; // Apenas texto, ou link para Person se necessário

    @OneToMany(mappedBy = "institution", orphanRemoval = true)
    private Set<ProgramInstitutionModel> programMemberships = new HashSet<>();
}