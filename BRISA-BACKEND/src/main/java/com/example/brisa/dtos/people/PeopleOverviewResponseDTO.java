package com.example.brisa.dtos.people;

import java.util.List;

public record PeopleOverviewResponseDTO(
        PeopleSummaryDTO resumo,
        PeopleTabCountsDTO abas,
        List<PeopleListItemDTO> items
) {
}
