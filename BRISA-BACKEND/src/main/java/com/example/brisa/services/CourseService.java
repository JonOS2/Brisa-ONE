package com.example.brisa.services;

import com.example.brisa.dtos.course.CourseDetailsDTO;
import com.example.brisa.dtos.course.CourseStudentProgressionDTO;
import com.example.brisa.exceptions.ResourceNotFoundException;
import com.example.brisa.models.EnrollmentModel;
import com.example.brisa.models.course.CourseModel;
import com.example.brisa.models.course.CourseProgressionModel;
import com.example.brisa.repositories.CourseProgressionRepository;
import com.example.brisa.repositories.CourseRepository;
import com.example.brisa.repositories.EnrollmentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CourseService {

    private final CourseRepository courseRepository;
    private final CourseProgressionRepository courseProgressionRepository;
    private final EnrollmentRepository enrollmentRepository;

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

        // Progressões do curso filtradas pelos alunos da turma
        List<CourseProgressionModel> progressions = courseProgressionRepository
                .findByCourseIdAndClassId(courseId, classId);

        // Matrículas da turma para buscar notas
        List<EnrollmentModel> enrollments = enrollmentRepository.findByClassModelId(classId);
        Map<Long, Double> gradeByPeopleId = enrollments.stream()
                .filter(e -> e.getGrade() != null)
                .collect(Collectors.toMap(
                        e -> e.getPeople().getId(),
                        EnrollmentModel::getGrade,
                        (a, b) -> a // em caso de duplicata, mantém o primeiro
                ));

        // Monta lista de alunos
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

        // Estatísticas
        int total = students.size();
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
}