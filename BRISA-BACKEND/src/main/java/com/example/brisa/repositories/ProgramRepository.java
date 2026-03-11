package com.example.brisa.repositories;

import com.example.brisa.models.ProgramModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProgramRepository extends JpaRepository<ProgramModel, Long> {
    Optional<ProgramModel> findByCode(String code);
    boolean existsByCode(String code);
}
