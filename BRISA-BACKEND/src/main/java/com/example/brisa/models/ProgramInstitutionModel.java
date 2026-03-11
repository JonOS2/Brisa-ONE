package com.example.brisa.models;

import com.example.brisa.models.roles.InstitutionRoleModel;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "program_institutions", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"program_id", "institution_id"})
})
public class ProgramInstitutionModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinColumn(name = "program_id", nullable = false)
    private ProgramModel program;

    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinColumn(name = "institution_id", nullable = false)
    private InstitutionModel institution;

    @ManyToOne
    @JoinColumn(name = "role_id")
    private InstitutionRoleModel role;
}
