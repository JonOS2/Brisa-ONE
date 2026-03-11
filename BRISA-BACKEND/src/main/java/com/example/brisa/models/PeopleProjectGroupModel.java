package com.example.brisa.models;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

// classe many-to-many entre Person e ProjectGroup

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "people_project_groups")
public class PeopleProjectGroupModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "people_id", nullable = false)
    private PeopleModel people;

    @ManyToOne
    @JoinColumn(name = "project_group_id", nullable = false)
    private ProjectGroupModel projectGroup;
}
