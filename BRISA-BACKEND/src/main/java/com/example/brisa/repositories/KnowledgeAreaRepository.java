package com.example.brisa.repositories;

import com.example.brisa.models.KnowledgeAreaModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface KnowledgeAreaRepository extends JpaRepository<KnowledgeAreaModel, Long> {
    Optional<KnowledgeAreaModel> findByNameIgnoreCase(String name);
}
