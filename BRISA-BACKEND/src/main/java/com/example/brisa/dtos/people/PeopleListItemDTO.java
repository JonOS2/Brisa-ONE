package com.example.brisa.dtos.people;

import java.util.List;

public record PeopleListItemDTO(
        Long id,
        String nome,
        String cpf,
        String email,
        String genero,
        Integer idade,
        String cota,
        String cidade,
        String uf,
        String instituicao,
        String tipoFormacao,
        String curso,
        List<String> programas,
        String etapaAtual,
        String status,
        String ultimaAtualizacao
) {
}
