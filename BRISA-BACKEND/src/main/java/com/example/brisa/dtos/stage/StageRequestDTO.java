package com.example.brisa.dtos.stage;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StageRequestDTO {
    private String name;
    private Long classId;
    private String description;
}
