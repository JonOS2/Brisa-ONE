package com.example.brisa.dtos.stage;

import com.example.brisa.models.StageModel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StageResponseDTO {
    private Long id;
    private String name;
    private Long classId;
    private String className;
    private String description;
    private LocalDateTime createdAt;

    public StageResponseDTO(StageModel stage) {
        this.id = stage.getId();
        this.name = stage.getName();
        this.classId = stage.getClassModel().getId();
        this.className = stage.getClassModel().getCode();
        this.description = stage.getDescription();
        this.createdAt = stage.getCreatedAt();
    }
}
