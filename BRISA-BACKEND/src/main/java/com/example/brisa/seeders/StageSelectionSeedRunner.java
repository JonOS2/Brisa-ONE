package com.example.brisa.seeders;

import com.example.brisa.models.ClassModel;
import com.example.brisa.models.EnrollmentModel;
import com.example.brisa.models.PeopleModel;
import com.example.brisa.models.StageCandidateModel;
import com.example.brisa.models.StageModel;
import com.example.brisa.models.roles.AcademicRoleModel;
import com.example.brisa.enums.StageStatus;
import com.example.brisa.models.ProgramModel;
import com.example.brisa.repositories.*;

import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;

import lombok.RequiredArgsConstructor;

import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Component
@Order(2000)
@RequiredArgsConstructor
@ConditionalOnProperty(prefix = "brisa.seed", name = "enable", havingValue = "true")
public class StageSelectionSeedRunner implements ApplicationListener<ApplicationReadyEvent> {

    private final ProgramRepository programRepository;
    private final ClassRepository classRepository;
    private final StageRepository stageRepository;
    private final PeopleRepository peopleRepository;
    private final AcademicRoleRepository academicRoleRepository;
    private final EnrollmentRepository enrollmentRepository;
    private final StageCandidateRepository stageCandidateRepository;

    private boolean alreadySeeded = false;

    @Override
    public void onApplicationEvent(ApplicationReadyEvent event) {
        if (alreadySeeded) return;
        try {
            runSeed();
            alreadySeeded = true;
        } catch (Exception e) {
            System.err.println("Seed runner failed: " + e.getMessage());
            e.printStackTrace();
        }
    }

    @Transactional
    public void runSeed() {
        final String PROG_CODE = "SEED-PROG-2026";
        final String CLASS_CODE = "SEED-CLASS-2026";
        final int CANDIDATES = 300;

        if (classRepository.existsByCode(CLASS_CODE)) {
            System.out.println("Seed class already exists, skipping stage/seed runner.");
            return;
        }

        // Ensure program
        ProgramModel program = programRepository.findByCode(PROG_CODE)
                .orElseGet(() -> {
                    ProgramModel p = new ProgramModel();
                    p.setCode(PROG_CODE);
                    p.setName("Seed Program 2026");
                    return programRepository.save(p);
                });

        // Create class
        ClassModel cls = new ClassModel();
        cls.setCode(CLASS_CODE);
        cls.setProgram(program);
        cls.setDefaultLevelingCapacity(250);
        cls.setDefaultImmersionCapacity(50);
        cls.setImmersionTeamSize(5);
        cls = classRepository.save(cls);

        // Ensure stages
        StageModel selecao = createStageIfNotExists("SELECAO", cls, "Etapa de seleção (seed)");
        StageModel nivelamento = createStageIfNotExists("NIVELAMENTO", cls, "Etapa de nivelamento (seed)");
        StageModel imersao = createStageIfNotExists("IMERSAO", cls, "Etapa de imersão (seed)");

        // Ensure academic role ALUNO
        AcademicRoleModel alunoRole = academicRoleRepository.findByName("ALUNO")
                .orElseGet(() -> academicRoleRepository.save(new AcademicRoleModel("ALUNO", "Aluno (seed)")));

        // Create people
        List<PeopleModel> peopleToSave = new ArrayList<>();
        for (int i = 1; i <= CANDIDATES; i++) {
            PeopleModel p = new PeopleModel();
            p.setName("Candidate " + i);
            p.setEmail(String.format("candidate%03d@example.com", i));
            p.setCpf(String.format("000000%03d", i));
            peopleToSave.add(p);
        }
        List<PeopleModel> savedPeople = peopleRepository.saveAll(peopleToSave);

        // Create enrollments with random grades
        Random rnd = new Random(42);
        List<EnrollmentModel> enrollments = new ArrayList<>();
        for (PeopleModel p : savedPeople) {
            EnrollmentModel e = new EnrollmentModel();
            e.setPeople(p);
            e.setClassModel(cls);
            e.setAcademicRole(alunoRole);
            e.setEnrollmentDate(LocalDate.now());
            e.setStatus("MATRICULADO");
            // grade between 0.0 and 100.0
            double grade = Math.round((50.0 + rnd.nextGaussian() * 15.0) * 100.0) / 100.0; // center ~50
            if (grade < 0) grade = 0.0;
            if (grade > 100) grade = 100.0;
            e.setGrade(grade);
            enrollments.add(e);
        }
        enrollmentRepository.saveAll(enrollments);

        // Create SELECAO candidates for all
        List<StageCandidateModel> selecaoCandidates = savedPeople.stream().map(p -> {
            StageCandidateModel sc = new StageCandidateModel();
            sc.setStage(selecao);
            sc.setPeople(p);
            sc.setStatus(StageStatus.APROVADO);
            sc.setNotes("seed");
            return sc;
        }).collect(Collectors.toList());
        stageCandidateRepository.saveAll(selecaoCandidates);

        // Nivelamento: pick top N by enrollment grade
        List<EnrollmentModel> classEnrolls = enrollmentRepository.findByClassModelId(cls.getId());
        classEnrolls.sort(Comparator.comparing((EnrollmentModel e) -> e.getGrade() == null ? 0.0 : e.getGrade()).reversed());

        int levelingCapacity = cls.getDefaultLevelingCapacity() != null ? cls.getDefaultLevelingCapacity() : 250;
        Set<Long> topNivelIds = classEnrolls.stream()
                .limit(levelingCapacity)
                .map(e -> e.getPeople().getId())
                .collect(Collectors.toSet());

        List<StageCandidateModel> nivelamentoCandidates = new ArrayList<>();
        for (EnrollmentModel e : classEnrolls) {
            StageCandidateModel sc = new StageCandidateModel();
            sc.setStage(nivelamento);
            sc.setPeople(e.getPeople());
            sc.setStatus(topNivelIds.contains(e.getPeople().getId()) ? StageStatus.APROVADO : StageStatus.REPROVADO);
            sc.setNotes("grade:" + (e.getGrade() == null ? "0" : e.getGrade()));
            nivelamentoCandidates.add(sc);
        }
        stageCandidateRepository.saveAll(nivelamentoCandidates);

        // Imersão: pick top M from those approved in nivelamento
        int immersionCapacity = cls.getDefaultImmersionCapacity() != null ? cls.getDefaultImmersionCapacity() : 50;
        List<EnrollmentModel> nivelApproved = classEnrolls.stream()
                .filter(en -> topNivelIds.contains(en.getPeople().getId()))
                .collect(Collectors.toList());

        Set<Long> topImersaoIds = nivelApproved.stream()
                .limit(immersionCapacity)
                .map(en -> en.getPeople().getId())
                .collect(Collectors.toSet());

        List<StageCandidateModel> imersaoCandidates = new ArrayList<>();
        for (EnrollmentModel e : nivelApproved) {
            StageCandidateModel sc = new StageCandidateModel();
            sc.setStage(imersao);
            sc.setPeople(e.getPeople());
            sc.setStatus(topImersaoIds.contains(e.getPeople().getId()) ? StageStatus.APROVADO : StageStatus.REPROVADO);
            sc.setNotes("grade:" + (e.getGrade() == null ? "0" : e.getGrade()));
            imersaoCandidates.add(sc);
        }
        stageCandidateRepository.saveAll(imersaoCandidates);

        System.out.println("Seed completed: people=" + savedPeople.size()
                + ", enrollments=" + enrollments.size()
                + ", selecaoCandidates=" + selecaoCandidates.size()
                + ", nivelamentoApproved=" + topNivelIds.size()
                + ", imersaoApproved=" + topImersaoIds.size());
    }

    private StageModel createStageIfNotExists(String name, ClassModel cls, String description) {
        Optional<StageModel> opt = stageRepository.findByNameAndClassModelId(name, cls.getId());
        if (opt.isPresent()) return opt.get();

        StageModel s = new StageModel();
        s.setName(name);
        s.setClassModel(cls);
        s.setDescription(description);
        return stageRepository.save(s);
    }
}
