package com.example.brisa.services;

import com.example.brisa.exceptions.ResourceNotFoundException;
import com.example.brisa.models.ClassModel;
import com.example.brisa.models.ProgramModel;
import com.example.brisa.repositories.ClassRepository;
import com.example.brisa.repositories.ProgramRepository;
import com.example.brisa.repositories.StageRepository;
import com.example.brisa.models.StageModel;
import com.example.brisa.exceptions.ValidationException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class ClassService {
    
    private final ClassRepository classRepository;
    private final ProgramRepository programRepository;
    private final StageRepository stageRepository;

    public List<ClassModel> findAll() {
        return classRepository.findAll();
    }

    public ClassModel findById(Long id) {
        return classRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Turma não encontrada com id: " + id));
    }

    public List<ClassModel> findByProgramId(Long programId) {
        return classRepository.findByProgramId(programId);
    }

    // ✅ Retorna mapa { programId -> contagem } em uma única query
    public Map<Long, Long> getClassesCountByProgram() {
        List<Object[]> results = classRepository.countClassesGroupedByProgram();
        Map<Long, Long> countMap = new HashMap<>();
        for (Object[] row : results) {
            Long programId = ((Number) row[0]).longValue();
            Long count     = ((Number) row[1]).longValue();
            countMap.put(programId, count);
        }
        return countMap;
    }

    @Transactional
    public ClassModel create(ClassModel classModel) {
        List<String> errors = new java.util.ArrayList<>();
        if (classModel.getCode() == null || classModel.getCode().trim().isEmpty()) {
            errors.add("Class code is required");
        }
        if (classModel.getStartDate() == null) {
            errors.add("Start date is required");
        }
        if (classModel.getEndDate() == null) {
            errors.add("End date is required");
        }
        if (classModel.getLocation() == null || classModel.getLocation().getId() == null) {
            errors.add("Institution (location) is required");
        }
        if (!errors.isEmpty()) {
            throw new ValidationException(errors);
        }

        if (classModel.getProgram() != null && classModel.getProgram().getId() != null) {
            ProgramModel program = programRepository.findById(classModel.getProgram().getId())
                    .orElseThrow(() -> new ResourceNotFoundException("Programa não encontrado"));
            classModel.setProgram(program);
        }

        ClassModel saved = classRepository.save(classModel);

        // Ensure default stages exist: SELECAO, NIVELAMENTO, IMERSAO
        String[] defaultStages = new String[] {"SELECAO", "NIVELAMENTO", "IMERSAO"};
        for (String name : defaultStages) {
            if (!stageRepository.existsByNameAndClassModelId(name, saved.getId())) {
                StageModel s = new StageModel();
                s.setName(name);
                s.setClassModel(saved);
                s.setDescription(name + " stage");
                stageRepository.save(s);
            }
        }

        return saved;
    }

    @Transactional
    public ClassModel update(Long id, ClassModel classDetails) {
        ClassModel classModel = findById(id);
        
        classModel.setCode(classDetails.getCode());
        classModel.setStartDate(classDetails.getStartDate());
        classModel.setEndDate(classDetails.getEndDate());
        
        if (classDetails.getProgram() != null && classDetails.getProgram().getId() != null) {
            ProgramModel program = programRepository.findById(classDetails.getProgram().getId())
                    .orElseThrow(() -> new ResourceNotFoundException("Programa não encontrado"));
            classModel.setProgram(program);
        }
        if (classDetails.getLocation() != null) {
            classModel.setLocation(classDetails.getLocation());
        }
        return classRepository.save(classModel);
    }

    @Transactional
    public void delete(Long id) {
        ClassModel classModel = findById(id);
        classRepository.delete(classModel);
    }
}