package com.example.brisa.services;

import com.example.brisa.dtos.course.CourseAlertRequestDTO;
import com.example.brisa.dtos.course.CourseAlertResponseDTO;
import com.example.brisa.dtos.course.CourseDetailsDTO;
import com.example.brisa.dtos.course.CourseStudentProgressionDTO;
import com.example.brisa.exceptions.ResourceNotFoundException;
import com.example.brisa.models.EnrollmentModel;
import com.example.brisa.models.course.CourseModel;
import com.example.brisa.models.course.CourseProgressionModel;
import com.example.brisa.repositories.CourseProgressionRepository;
import com.example.brisa.repositories.CourseRepository;
import com.example.brisa.repositories.EnrollmentRepository;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CourseService {

    private final CourseRepository courseRepository;
    private final CourseProgressionRepository courseProgressionRepository;
    private final EnrollmentRepository enrollmentRepository;
    private final EmailService emailService;

    public List<CourseModel> findAll() {
        return courseRepository.findAll();
    }

    public CourseModel findById(Long id) {
        return courseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Curso não encontrado com id: " + id));
    }

    public List<CourseProgressionModel> findProgressionsByClassId(Long classId) {
        return courseProgressionRepository.findByClassId(classId);
    }

    public List<CourseProgressionModel> findProgressionsByCourseId(Long courseId) {
        return courseProgressionRepository.findByCourseId(courseId);
    }

    /**
     * Retorna detalhes completos de um curso para uma turma específica,
     * incluindo progressão de cada aluno e nota do EnrollmentModel.
     */
    public CourseDetailsDTO getCourseDetails(Long courseId, Long classId) {
        CourseModel course = findById(courseId);

        List<CourseProgressionModel> progressions = courseProgressionRepository
                .findByCourseIdAndClassId(courseId, classId);

        List<EnrollmentModel> enrollments = enrollmentRepository.findByClassModelId(classId);
        Map<Long, Double> gradeByPeopleId = enrollments.stream()
                .filter(e -> e.getGrade() != null)
                .collect(Collectors.toMap(
                        e -> e.getPeople().getId(),
                        EnrollmentModel::getGrade,
                        (a, b) -> a
                ));

        List<CourseStudentProgressionDTO> students = progressions.stream()
                .map(p -> new CourseStudentProgressionDTO(
                        p.getPeople().getId(),
                        p.getPeople().getName(),
                        p.getPeople().getEmail(),
                        p.getStatus(),
                        p.getCompletionPercentage(),
                        p.getLastAccess(),
                        gradeByPeopleId.get(p.getPeople().getId())
                ))
                .collect(Collectors.toList());

        int total      = students.size();
        int notStarted = (int) students.stream().filter(s -> "não iniciado".equalsIgnoreCase(s.status())).count();
        int inProgress = (int) students.stream().filter(s -> "em andamento".equalsIgnoreCase(s.status())).count();
        int completed  = (int) students.stream().filter(s -> "concluído".equalsIgnoreCase(s.status())).count();
        double avgCompletion = total > 0
                ? students.stream().mapToDouble(CourseStudentProgressionDTO::completionPercentage).average().orElse(0)
                : 0;

        return new CourseDetailsDTO(
                course.getId(),
                course.getName(),
                course.getKnowledgeArea() != null ? course.getKnowledgeArea().getName() : null,
                course.getWorkload(),
                total,
                notStarted,
                inProgress,
                completed,
                Math.round(avgCompletion * 10.0) / 10.0,
                students
        );
    }

    /**
     * Envia email de alerta para todos os alunos com status "não iniciado" ou "em andamento"
     * em um curso específico dentro de uma turma.
     */
    public CourseAlertResponseDTO sendCourseAlert(Long courseId, Long classId, CourseAlertRequestDTO request) {
        CourseModel course = findById(courseId);

        List<CourseProgressionModel> pendingProgressions = courseProgressionRepository
                .findByCourseIdAndClassId(courseId, classId)
                .stream()
                .filter(p -> "não iniciado".equalsIgnoreCase(p.getStatus())
                          || "em andamento".equalsIgnoreCase(p.getStatus()))
                .collect(Collectors.toList());

        int totalSent   = 0;
        int totalFailed = 0;
        List<String> failedEmails = new ArrayList<>();

        for (CourseProgressionModel progression : pendingProgressions) {
            String email = progression.getPeople().getEmail();
            String name  = progression.getPeople().getName();
            int    pct   = (int) Math.round(progression.getCompletionPercentage());

            try {
                String htmlContent = buildAlertEmailHtml(
                        name,
                        request.message(),
                        course.getName(),
                        pct
                );
                emailService.sendEmail(email, request.subject(), htmlContent);
                totalSent++;
            } catch (MessagingException | IOException e) {
                System.err.println("Falha ao enviar email para " + email + ": " + e.getMessage());
                failedEmails.add(email);
                totalFailed++;
            }
        }

        return new CourseAlertResponseDTO(totalSent, totalFailed, failedEmails);
    }

    /**
     * Carrega o template HTML e substitui os placeholders.
     */
    private String buildAlertEmailHtml(String studentName, String message,
                                        String courseName, int completionPercentage)
            throws IOException {

        ClassPathResource resource = new ClassPathResource("templates/email/course-alert.html");
        String html = new String(Files.readAllBytes(Path.of(resource.getURI())));

        return html
                .replace("${studentName}",          studentName)
                .replace("${message}",              message)
                .replace("${courseName}",           courseName)
                .replace("${completionPercentage}", String.valueOf(completionPercentage));
    }
}