package com.example.brisa.dtos.stage;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StageCandidateCountDTO {
    private Long stageId;
    private Long count;
}
