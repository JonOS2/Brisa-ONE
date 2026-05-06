package com.example.brisa.dtos.program;

import java.util.List;

public record ProgramClassTemplateDTO(
        Long id,
        String nome,
        String parceiro,
        long turmas,
        String status,
        String publicoAlvo,
        String modalidadeNivelamento,
        String duracaoNivelamento,
        String duracaoImersao,
        Integer cargaHorariaImersao,
        Integer vagasNivelamento,
        Integer vagasImersao,
        List<String> criteriosCotas,
        List<String> cursosObrigatorios,
        String criteriosAvaliacao
) {
}
