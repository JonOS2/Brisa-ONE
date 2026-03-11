package com.example.brisa.dtos.people;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PeopleImportDTO {
    private String name;
    private String email;
    private String cpf;
    private String educationLevel;
    private String address;
    private String city;
    private String gender;
    private LocalDate birthDate;
}
