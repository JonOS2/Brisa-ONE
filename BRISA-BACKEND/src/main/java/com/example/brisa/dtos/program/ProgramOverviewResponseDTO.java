package com.example.brisa.dtos.program;

import java.util.List;

public record ProgramOverviewResponseDTO(
        ProgramSummaryDTO resumo,
        ProgramTabCountsDTO abas,
        List<ProgramOverviewItemDTO> items
) {
}
