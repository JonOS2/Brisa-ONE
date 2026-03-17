package com.example.brisa.controllers;

import com.example.brisa.dtos.course.CourseAlertRequestDTO;
import com.example.brisa.dtos.course.CourseAlertResponseDTO;
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

    // GET /api/courses/{courseId}/details/class/{classId}
    @GetMapping("/{courseId}/details/class/{classId}")
    public ResponseEntity<CourseDetailsDTO> getCourseDetails(
            @PathVariable Long courseId,
            @PathVariable Long classId) {
        return ResponseEntity.ok(courseService.getCourseDetails(courseId, classId));
    }

    // ✅ POST /api/courses/{courseId}/alert/class/{classId}
    // Envia alerta por email para alunos pendentes (não iniciado / em andamento)
    @PostMapping("/{courseId}/alert/class/{classId}")
    public ResponseEntity<CourseAlertResponseDTO> sendAlert(
            @PathVariable Long courseId,
            @PathVariable Long classId,
            @RequestBody CourseAlertRequestDTO request) {
        return ResponseEntity.ok(courseService.sendCourseAlert(courseId, classId, request));
    }
}