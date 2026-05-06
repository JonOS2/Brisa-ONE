package com.example.brisa.dtos.people;

import java.util.List;

public record PeopleCreateLinkResponseDTO(
        Long peopleId,
        boolean pessoaCriada,
        boolean vinculoCriado,
        boolean conflitoDetectado,
        List<String> alertas,
        PeopleListItemDTO pessoa
) {
}
