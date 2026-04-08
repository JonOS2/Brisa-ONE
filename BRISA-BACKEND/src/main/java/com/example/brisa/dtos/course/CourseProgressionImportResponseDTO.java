package com.example.brisa.dtos.course;

import java.util.List;

public record CourseProgressionImportResponseDTO(
        int totalProcessed,
        int createdProgressions,
        int updatedProgressions,
        int updatedGrades,
        int skippedRows,
        List<String> unknownCourses,
        List<String> peopleNotInClassCpfs
) {}
