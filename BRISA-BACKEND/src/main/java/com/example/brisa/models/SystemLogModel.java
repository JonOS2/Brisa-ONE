package com.example.brisa.models;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import com.example.brisa.enums.LogAction;
import com.example.brisa.models.auth.UserModel;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "system_logs", indexes = {
    @Index(name = "idx_action", columnList = "action"),
    @Index(name = "idx_created_at", columnList = "created_at"),
    @Index(name = "idx_user_id", columnList = "user_id")
})
public class SystemLogModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private LogAction action;

    @Column(length = 2000)
    private String description;

    @Column(name = "entity_type")
    private String entityType; // Tipo da entidade afetada (People, Program, Class, etc)

    @Column(name = "entity_id")
    private String entityId; // ID da entidade afetada

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserModel user; // Usuário que realizou a ação

    @Column(name = "ip_address")
    private String ipAddress;

    @Column(name = "user_agent", length = 500)
    private String userAgent;

    @Column(columnDefinition = "TEXT")
    private String details; // JSON com detalhes adicionais

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
}
