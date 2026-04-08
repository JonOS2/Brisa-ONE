package com.example.brisa.repositories;

import com.example.brisa.models.course.CourseAssignmentModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CourseAssignmentRepository extends JpaRepository<CourseAssignmentModel, Long> {

    @Query("SELECT ca FROM CourseAssignmentModel ca WHERE ca.classModel.id = :classId")
    List<CourseAssignmentModel> findByClassId(@Param("classId") Long classId);

    @Query("SELECT ca FROM CourseAssignmentModel ca WHERE ca.course.id = :courseId AND ca.classModel.id = :classId")
    CourseAssignmentModel findByCourseIdAndClassId(@Param("courseId") Long courseId, @Param("classId") Long classId);

    @Modifying
    @Query("DELETE FROM CourseAssignmentModel ca WHERE ca.course.id = :courseId AND ca.classModel.id = :classId")
    void deleteByCourseIdAndClassId(@Param("courseId") Long courseId, @Param("classId") Long classId);

    @Query("SELECT ca FROM CourseAssignmentModel ca WHERE ca.course.id = :courseId")
    List<CourseAssignmentModel> findByCourseId(@Param("courseId") Long courseId);
}
