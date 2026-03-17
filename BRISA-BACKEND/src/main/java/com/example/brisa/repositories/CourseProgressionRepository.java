package com.example.brisa.repositories;

import com.example.brisa.models.course.CourseProgressionModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CourseProgressionRepository extends JpaRepository<CourseProgressionModel, Long> {

    List<CourseProgressionModel> findByCourseId(Long courseId);

    List<CourseProgressionModel> findByPeopleId(Long peopleId);

    // Busca todas as progressões de cursos dos alunos matriculados em uma turma
    @Query("""
        SELECT cp FROM CourseProgressionModel cp
        WHERE cp.people.id IN (
            SELECT e.people.id FROM EnrollmentModel e WHERE e.classModel.id = :classId
        )
    """)
    List<CourseProgressionModel> findByClassId(@Param("classId") Long classId);

    // ✅ Novo: Progressões de um curso específico para alunos de uma turma
    @Query("""
        SELECT cp FROM CourseProgressionModel cp
        WHERE cp.course.id = :courseId
        AND cp.people.id IN (
            SELECT e.people.id FROM EnrollmentModel e WHERE e.classModel.id = :classId
        )
    """)
    List<CourseProgressionModel> findByCourseIdAndClassId(
        @Param("courseId") Long courseId,
        @Param("classId") Long classId
    );
}