package com.example.brisa.dtos.program;

public record ProgramSummaryDTO(
        long totalProgramas,
        long programasAtivos,
        long emEspera,
        long emImersao,
        long emNivelamento,
        long encerrados
) {
}
