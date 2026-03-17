package com.example.brisa.dtos.institution;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class InstitutionRequestDTO {
    private String code;
    private String name;
    private String acronym;
    private String state; // ✅ campo adicionado
    private String localCoordinatorName;
}