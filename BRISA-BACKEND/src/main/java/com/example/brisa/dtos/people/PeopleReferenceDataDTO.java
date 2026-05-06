package com.example.brisa.dtos.people;

import java.util.List;

public record PeopleReferenceDataDTO(
        List<PeopleFilterOptionDTO> programas,
        List<PeopleFilterOptionDTO> turmas,
        List<PeopleFilterOptionDTO> etapas,
        List<String> statusOptions,
        List<String> cotaOptions,
        List<String> generoOptions,
        List<String> estadoOptions,
        List<String> cidadeOptions,
        List<String> instituicaoOptions,
        List<String> tipoFormacaoOptions,
        List<String> statusFormacaoOptions
) {
}
