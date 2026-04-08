package com.example.brisa.controllers;

import com.example.brisa.models.ProgramModel;
import com.example.brisa.services.ProgramService;
import com.example.brisa.services.LogHelper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.ArrayList;
import java.util.UUID;

@RestController
@RequestMapping("api/programs")
@RequiredArgsConstructor
public class ProgramController {
    
    private final ProgramService programService;
    private final LogHelper logHelper;

    @GetMapping
    public ResponseEntity<List<ProgramModel>> getAllPrograms() {
        List<ProgramModel> programs = programService.findAll();
        return ResponseEntity.ok(programs);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProgramModel> getProgramById(@PathVariable Long id) {
        ProgramModel program = programService.findById(id);
        return ResponseEntity.ok(program);
    }

    @PostMapping
    public ResponseEntity<ProgramModel> createProgram(
            @RequestBody ProgramModel program,
            HttpServletRequest request) {
        List<String> errors = new ArrayList<>();
        if (program.getContractNumber() == null || program.getContractNumber().trim().isEmpty()) {
            errors.add("Contract number is required");
        }
        if (program.getStartDate() == null) {
            errors.add("Start date is required");
        }
        if (program.getEndDate() == null) {
            errors.add("End date is required");
        }
        if (!errors.isEmpty()) {
            throw new com.example.brisa.exceptions.ValidationException(errors);
        }

        ProgramModel createdProgram = programService.create(program);
        
        try {
            UUID userId = getUserId();
            logHelper.logCreate("Program", createdProgram.getId().toString(), 
                createdProgram.getName(), userId, request);
        } catch (Exception e) {
            // Log error but don't fail the request
        }
        
        return ResponseEntity.status(HttpStatus.CREATED).body(createdProgram);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProgramModel> updateProgram(
            @PathVariable Long id,
            @RequestBody ProgramModel program,
            HttpServletRequest request) {
        List<String> errors = new ArrayList<>();
        if (program.getContractNumber() == null || program.getContractNumber().trim().isEmpty()) {
            errors.add("Contract number is required");
        }
        if (program.getStartDate() == null) {
            errors.add("Start date is required");
        }
        if (program.getEndDate() == null) {
            errors.add("End date is required");
        }
        if (!errors.isEmpty()) {
            throw new com.example.brisa.exceptions.ValidationException(errors);
        }

        ProgramModel updatedProgram = programService.update(id, program);
        
        try {
            UUID userId = getUserId();
            logHelper.logUpdate("Program", updatedProgram.getId().toString(), 
                updatedProgram.getName(), userId, request);
        } catch (Exception e) {
            // Log error but don't fail the request
        }
        
        return ResponseEntity.ok(updatedProgram);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProgram(
            @PathVariable Long id,
            HttpServletRequest request) {
        try {
            ProgramModel program = programService.findById(id);
            UUID userId = getUserId();
            logHelper.logDelete("Program", id.toString(), program.getName(), userId, request);
        } catch (Exception e) {
            // Log error but don't fail the request
        }
        
        programService.delete(id);
        return ResponseEntity.noContent().build();
    }
    
    private UUID getUserId() {
        try {
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            if (auth != null && auth.getPrincipal() instanceof com.example.brisa.models.auth.UserModel) {
                return ((com.example.brisa.models.auth.UserModel) auth.getPrincipal()).getId();
            }
        } catch (Exception e) {
            // Return null if can't get user
        }
        return null;
    }
}
