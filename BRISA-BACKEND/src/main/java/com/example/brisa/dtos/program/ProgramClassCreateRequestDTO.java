package com.example.brisa.dtos.program;

import lombok.Data;

import java.time.LocalDate;

@Data
public class ProgramClassCreateRequestDTO {
    private String nomeTurma;
    private String localidade;
    private Long instituicaoId;
    private String instituicaoNome;
    private Integer qtdVagas;
    private LocalDate publicationDate;
    private LocalDate applicationStartDate;
    private LocalDate applicationEndDate;
    private LocalDate levelingSelectionAnnouncementDate;
    private LocalDate levelingConfirmationStartDate;
    private LocalDate levelingConfirmationEndDate;
    private LocalDate levelingStartDate;
    private LocalDate levelingEndDate;
    private LocalDate levelingFinalExamDate;
    private LocalDate immersionSelectionAnnouncementDate;
    private LocalDate immersionConfirmationStartDate;
    private LocalDate immersionConfirmationEndDate;
    private LocalDate immersionStartDate;
    private LocalDate immersionEndDate;
    private LocalDate partialEvaluationDate;
    private LocalDate finalEvaluationDate;
    private LocalDate certificateIssueDate;
}
