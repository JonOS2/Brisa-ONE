package com.example.brisa.dtos.people;

public record PeopleSummaryDTO(
        long totalPessoas,
        long pessoasAtivas,
        long emProgramasAtivos,
        long emNivelamento,
        long emImersao,
        long novosCadastros30d
) {
}
