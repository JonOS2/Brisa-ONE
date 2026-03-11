package com.example.brisa.controllers;

import com.example.brisa.dtos.people.PeopleImportDTO;
import com.example.brisa.dtos.people.PeopleImportResponseDTO;
import com.example.brisa.services.PeopleService;
import com.example.brisa.services.LogHelper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import jakarta.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("api/people")
@RequiredArgsConstructor
public class PeopleController {
    
    private final PeopleService peopleService;
    private final LogHelper logHelper;

    @GetMapping
    public ResponseEntity<List<com.example.brisa.models.PeopleModel>> getAllPeople() {
        List<com.example.brisa.models.PeopleModel> people = peopleService.findAll();
        return ResponseEntity.ok(people);
    }

    @GetMapping("/{id}")
    public ResponseEntity<com.example.brisa.models.PeopleModel> getPeopleById(@PathVariable Long id) {
        com.example.brisa.models.PeopleModel people = peopleService.findById(id);
        return ResponseEntity.ok(people);
    }

    @PostMapping
    public ResponseEntity<com.example.brisa.models.PeopleModel> createPeople(
            @RequestBody com.example.brisa.models.PeopleModel people,
            HttpServletRequest request) {
        com.example.brisa.models.PeopleModel createdPeople = peopleService.create(people);
        
        try {
            UUID userId = getUserId();
            logHelper.logCreate("People", createdPeople.getId().toString(), 
                createdPeople.getName(), userId, request);
        } catch (Exception e) {
            // Log error but don't fail the request
        }
        
        return ResponseEntity.status(HttpStatus.CREATED).body(createdPeople);
    }

    @PutMapping("/{id}")
    public ResponseEntity<com.example.brisa.models.PeopleModel> updatePeople(
            @PathVariable Long id,
            @RequestBody com.example.brisa.models.PeopleModel people,
            HttpServletRequest request) {
        com.example.brisa.models.PeopleModel updatedPeople = peopleService.update(id, people);
        
        try {
            UUID userId = getUserId();
            logHelper.logUpdate("People", updatedPeople.getId().toString(), 
                updatedPeople.getName(), userId, request);
        } catch (Exception e) {
            // Log error but don't fail the request
        }
        
        return ResponseEntity.ok(updatedPeople);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePeople(
            @PathVariable Long id,
            HttpServletRequest request) {
        try {
            com.example.brisa.models.PeopleModel people = peopleService.findById(id);
            UUID userId = getUserId();
            logHelper.logDelete("People", id.toString(), people.getName(), userId, request);
        } catch (Exception e) {
            // Log error but don't fail the request
        }
        
        peopleService.delete(id);
        return ResponseEntity.noContent().build();
    }
    
    @PostMapping("/import/excel")
    public ResponseEntity<PeopleImportResponseDTO> importPeopleFromExcel(
            @RequestParam("file") MultipartFile file,
            HttpServletRequest request) {
        
        // Valida se o arquivo foi enviado
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }
        
        // Valida se é um arquivo Excel
        String fileName = file.getOriginalFilename();
        if (fileName == null || (!fileName.endsWith(".xlsx") && !fileName.endsWith(".xls"))) {
            return ResponseEntity.badRequest().build();
        }
        
        try {
            PeopleImportResponseDTO response = peopleService.importPeopleFromExcel(file);
            
            try {
                UUID userId = getUserId();
                logHelper.logImport("People", 
                    response.getSuccessfullyInserted(),
                    response.getAlreadyExists(),
                    userId, request);
            } catch (Exception e) {
                // Log error but don't fail the request
            }
            
            return ResponseEntity.ok(response);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
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
