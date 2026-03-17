package com.example.brisa.controllers;

import com.example.brisa.dtos.course.CourseDetailsDTO;
import com.example.brisa.models.course.CourseModel;
import com.example.brisa.models.course.CourseProgressionModel;
import com.example.brisa.services.CourseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/courses")
@RequiredArgsConstructor
public class CourseController {

    private final CourseService courseService;

    // GET /api/courses
    @GetMapping
    public ResponseEntity<List<CourseModel>> getAllCourses() {
        return ResponseEntity.ok(courseService.findAll());
    }

    // GET /api/courses/{id}
    @GetMapping("/{id}")
    public ResponseEntity<CourseModel> getCourseById(@PathVariable Long id) {
        return ResponseEntity.ok(courseService.findById(id));
    }

    // GET /api/courses/progressions/class/{classId}
    @GetMapping("/progressions/class/{classId}")
    public ResponseEntity<List<CourseProgressionModel>> getProgressionsByClassId(@PathVariable Long classId) {
        return ResponseEntity.ok(courseService.findProgressionsByClassId(classId));
    }

    // GET /api/courses/progressions/course/{courseId}
    @GetMapping("/progressions/course/{courseId}")
    public ResponseEntity<List<CourseProgressionModel>> getProgressionsByCourseId(@PathVariable Long courseId) {
        return ResponseEntity.ok(courseService.findProgressionsByCourseId(courseId));
    }

    // ✅ GET /api/courses/{courseId}/details/class/{classId}
    // Retorna detalhes completos do curso para uma turma: progressões, notas, último acesso
    @GetMapping("/{courseId}/details/class/{classId}")
    public ResponseEntity<CourseDetailsDTO> getCourseDetails(
            @PathVariable Long courseId,
            @PathVariable Long classId) {
        return ResponseEntity.ok(courseService.getCourseDetails(courseId, classId));
    }
}