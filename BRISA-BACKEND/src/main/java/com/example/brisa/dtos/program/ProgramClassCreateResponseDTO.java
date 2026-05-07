package com.example.brisa.dtos.program;

public record ProgramClassCreateResponseDTO(
        Long id,
        String codigo,
        Long programId,
        String programName,
        String localidade,
        Long institutionId
) {
}
