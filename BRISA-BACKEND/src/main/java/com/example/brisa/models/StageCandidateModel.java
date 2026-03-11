package com.example.brisa.models;

import com.example.brisa.enums.StageStatus;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "stage_candidates", 
    uniqueConstraints = {
        @UniqueConstraint(columnNames = {"stage_id", "people_id"})
    },
    indexes = {
        @Index(name = "idx_stage_candidate_stage_id", columnList = "stage_id"),
        @Index(name = "idx_stage_candidate_people_id", columnList = "people_id"),
        @Index(name = "idx_stage_candidate_status", columnList = "status"),
        @Index(name = "idx_stage_candidate_stage_status", columnList = "stage_id, status")
    }
)
public class StageCandidateModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "stage_id", nullable = false)
    private StageModel stage;

    @ManyToOne
    @JoinColumn(name = "people_id", nullable = false)
    private PeopleModel people;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private StageStatus status;

    @Column(name = "notes")
    private String notes;

    @CreationTimestamp
    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}
