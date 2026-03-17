package com.example.brisa.dtos.institution;

import com.example.brisa.models.InstitutionModel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class InstitutionResponseDTO {
    private Long id;
    private String code;
    private String name;
    private String acronym;
    private String state; // ✅ campo adicionado
    private String localCoordinatorName;

    public InstitutionResponseDTO(InstitutionModel institution) {
        this.id = institution.getId();
        this.code = institution.getCode();
        this.name = institution.getName();
        this.acronym = institution.getAcronym();
        this.state = institution.getState(); // ✅
        this.localCoordinatorName = institution.getLocalCoordinatorName();
    }
}