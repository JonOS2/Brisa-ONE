package com.example.brisa.repositories;

import com.example.brisa.models.StageModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StageRepository extends JpaRepository<StageModel, Long> {
    List<StageModel> findByClassModelId(Long classId);
    boolean existsByNameAndClassModelId(String name, Long classId);
    Optional<StageModel> findByNameAndClassModelId(String name, Long classId);
}
