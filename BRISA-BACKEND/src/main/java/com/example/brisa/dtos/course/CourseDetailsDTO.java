package com.example.brisa.dtos.course;

import java.util.List;

public record CourseDetailsDTO(
    Long courseId,
    String courseName,
    String knowledgeArea,
    double workload,
    int totalStudents,
    int notStarted,
    int inProgress,
    int completed,
    double averageCompletion,
    List<CourseStudentProgressionDTO> students
) {}