package com.example.brisa.dtos.course;

import java.time.LocalDate;

public record CourseStudentProgressionDTO(
    Long peopleId,
    String studentName,
    String studentEmail,
    String status,
    double completionPercentage,
    LocalDate lastAccess,
    Double grade  // vem do EnrollmentModel
) {}