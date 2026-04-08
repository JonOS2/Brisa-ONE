package com.example.brisa.dtos.course;

import java.util.List;

public record CourseClassImportResponseDTO(
        int totalProcessed,
        int createdCourses,
        int assignedCourses,
        int alreadyAssigned,
        int skippedRows,
        List<String> createdCourseNames
) {}
