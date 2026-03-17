package com.example.brisa.services;

import com.example.brisa.dtos.institution.InstitutionRequestDTO;
import com.example.brisa.dtos.institution.InstitutionResponseDTO;
import com.example.brisa.exceptions.ResourceNotFoundException;
import com.example.brisa.models.InstitutionModel;
import com.example.brisa.repositories.InstitutionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class InstitutionService {

    @Autowired
    private InstitutionRepository institutionRepository;

    public List<InstitutionResponseDTO> getAllInstitutions() {
        return institutionRepository.findAll()
                .stream()
                .map(InstitutionResponseDTO::new)
                .collect(Collectors.toList());
    }

    public InstitutionResponseDTO getInstitutionById(Long id) {
        InstitutionModel institution = institutionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Instituição não encontrada com ID: " + id));
        return new InstitutionResponseDTO(institution);
    }

    public InstitutionResponseDTO createInstitution(InstitutionRequestDTO dto) {
        if (dto.getName() != null && institutionRepository.findByName(dto.getName()).isPresent()) {
            throw new RuntimeException("Já existe uma instituição com o nome: " + dto.getName());
        }

        InstitutionModel institution = new InstitutionModel();
        institution.setCode(dto.getCode());
        institution.setName(dto.getName());
        institution.setAcronym(dto.getAcronym());
        institution.setState(dto.getState()); // ✅
        institution.setLocalCoordinatorName(dto.getLocalCoordinatorName());

        InstitutionModel saved = institutionRepository.save(institution);
        return new InstitutionResponseDTO(saved);
    }

    public InstitutionResponseDTO updateInstitution(Long id, InstitutionRequestDTO dto) {
        InstitutionModel institution = institutionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Instituição não encontrada com ID: " + id));

        if (dto.getName() != null) {
            institutionRepository.findByName(dto.getName()).ifPresent(existing -> {
                if (!existing.getId().equals(id)) {
                    throw new RuntimeException("Já existe uma instituição com o nome: " + dto.getName());
                }
            });
            institution.setName(dto.getName());
        }

        if (dto.getCode() != null) {
            institution.setCode(dto.getCode());
        }
        if (dto.getAcronym() != null) {
            institution.setAcronym(dto.getAcronym());
        }
        if (dto.getState() != null) {
            institution.setState(dto.getState()); // ✅
        }
        if (dto.getLocalCoordinatorName() != null) {
            institution.setLocalCoordinatorName(dto.getLocalCoordinatorName());
        }

        InstitutionModel updated = institutionRepository.save(institution);
        return new InstitutionResponseDTO(updated);
    }

    public void deleteInstitution(Long id) {
        if (!institutionRepository.existsById(id)) {
            throw new ResourceNotFoundException("Instituição não encontrada com ID: " + id);
        }
        institutionRepository.deleteById(id);
    }
}