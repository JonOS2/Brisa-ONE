package com.example.brisa.dtos.program;

public record ProgramTabCountsDTO(
        long ativos,
        long espera,
        long todos,
        long encerrados
) {
}
