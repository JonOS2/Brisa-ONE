package com.example.brisa.dtos.course;

import java.util.List;

public record CourseAlertResponseDTO(
    int totalSent,
    int totalFailed,
    List<String> failedEmails
) {}