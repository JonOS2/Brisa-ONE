package com.example.brisa.repositories;

import com.example.brisa.models.ClassModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ClassRepository extends JpaRepository<ClassModel, Long> {
    Optional<ClassModel> findByCode(String code);
    boolean existsByCode(String code);
    List<ClassModel> findByProgramId(Long programId);
}
