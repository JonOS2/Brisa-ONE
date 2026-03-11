package com.example.brisa.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.brisa.enums.LogAction;
import com.example.brisa.models.SystemLogModel;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Repository
public interface SystemLogRepository extends JpaRepository<SystemLogModel, Long> {
    
    // Buscar logs por ação
    Page<SystemLogModel> findByAction(LogAction action, Pageable pageable);
    
    // Buscar logs por usuário
    Page<SystemLogModel> findByUserId(UUID userId, Pageable pageable);
    
    // Buscar logs por tipo de entidade
    Page<SystemLogModel> findByEntityType(String entityType, Pageable pageable);
    
    // Buscar logs por entidade específica
    Page<SystemLogModel> findByEntityTypeAndEntityId(String entityType, String entityId, Pageable pageable);
    
    // Buscar logs por período
    Page<SystemLogModel> findByCreatedAtBetween(LocalDateTime startDate, LocalDateTime endDate, Pageable pageable);
    
    // Buscar logs por usuário e período
    @Query("SELECT l FROM SystemLogModel l WHERE l.user.id = :userId AND l.createdAt BETWEEN :startDate AND :endDate")
    Page<SystemLogModel> findByUserIdAndDateRange(
        @Param("userId") UUID userId,
        @Param("startDate") LocalDateTime startDate,
        @Param("endDate") LocalDateTime endDate,
        Pageable pageable
    );
    
    // Buscar logs por múltiplos critérios
    @Query("SELECT l FROM SystemLogModel l WHERE " +
           "(:action IS NULL OR l.action = :action) AND " +
           "(:userId IS NULL OR l.user.id = :userId) AND " +
           "(:entityType IS NULL OR l.entityType = CAST(:entityType AS string)) AND " +
           "(:startDate IS NULL OR l.createdAt >= :startDate) AND " +
           "(:endDate IS NULL OR l.createdAt <= :endDate)")
    Page<SystemLogModel> findByFilters(
        @Param("action") LogAction action,
        @Param("userId") UUID userId,
        @Param("entityType") String entityType,
        @Param("startDate") LocalDateTime startDate,
        @Param("endDate") LocalDateTime endDate,
        Pageable pageable
    );
    
    // Contar logs por ação
    long countByAction(LogAction action);
    
    // Contar logs por usuário
    long countByUserId(UUID userId);
    
    // Obter últimos logs
    List<SystemLogModel> findTop10ByOrderByCreatedAtDesc();
    
    // Estatísticas de logs por ação
    @Query("SELECT l.action, COUNT(l) FROM SystemLogModel l GROUP BY l.action")
    List<Object[]> countByActionGrouped();
}
