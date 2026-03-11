package com.example.brisa.dtos.people;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PeopleImportResponseDTO {
    private int totalProcessed;
    private int successfullyInserted;
    private int alreadyExists;
    private List<String> duplicatePersons; // Lista com nomes das pessoas que já existiam
}
