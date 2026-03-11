package com.example.brisa.dtos.stage;

import com.example.brisa.enums.StageStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StageCandidateRequestDTO {
    private Long stageId;
    private Long peopleId;
    private StageStatus status;
    private String notes;
}
