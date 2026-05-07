package com.example.brisa.repositories;

import com.example.brisa.models.ProjectGroupModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectGroupRepository extends JpaRepository<ProjectGroupModel, Long> {
    @Query("SELECT pg.classModel.id, COUNT(pg) FROM ProjectGroupModel pg GROUP BY pg.classModel.id")
    List<Object[]> countGroupedByClassId();
}
