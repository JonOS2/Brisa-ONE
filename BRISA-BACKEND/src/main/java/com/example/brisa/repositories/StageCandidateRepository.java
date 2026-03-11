package com.example.brisa.repositories;

import com.example.brisa.models.StageCandidateModel;
import com.example.brisa.enums.StageStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@Repository
public interface StageCandidateRepository extends JpaRepository<StageCandidateModel, Long> {
    @Query("SELECT sc FROM StageCandidateModel sc JOIN FETCH sc.people WHERE sc.stage.id = :stageId ORDER BY sc.people.name")
    List<StageCandidateModel> findByStageId(@Param("stageId") Long stageId);
    
    List<StageCandidateModel> findByPeopleId(Long peopleId);
    List<StageCandidateModel> findByStageIdAndStatus(Long stageId, StageStatus status);
    Optional<StageCandidateModel> findByStageIdAndPeopleId(Long stageId, Long peopleId);
    boolean existsByStageIdAndPeopleId(Long stageId, Long peopleId);
    
    @Query("SELECT sc.stage.id as stageId, COUNT(sc) as count FROM StageCandidateModel sc WHERE sc.stage.classModel.id = :classId GROUP BY sc.stage.id")
    List<Object[]> countCandidatesByClassId(@Param("classId") Long classId);
}
