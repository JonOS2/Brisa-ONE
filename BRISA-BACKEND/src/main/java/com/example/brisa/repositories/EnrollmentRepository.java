package com.example.brisa.repositories;

import com.example.brisa.models.EnrollmentModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EnrollmentRepository extends JpaRepository<EnrollmentModel, Long> {
    List<EnrollmentModel> findByClassModelId(Long classId);
    List<EnrollmentModel> findByPeopleId(Long peopleId);
}
