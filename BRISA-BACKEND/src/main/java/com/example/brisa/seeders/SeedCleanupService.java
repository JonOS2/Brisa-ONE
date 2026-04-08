package com.example.brisa.seeders;

import com.example.brisa.models.PeopleModel;
import com.example.brisa.models.StageCandidateModel;
import com.example.brisa.models.StageModel;
import com.example.brisa.models.ClassModel;
import com.example.brisa.models.ProgramModel;
import com.example.brisa.models.EnrollmentModel;
import com.example.brisa.repositories.*;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SeedCleanupService {

    private final PeopleRepository peopleRepository;
    private final StageCandidateRepository stageCandidateRepository;
    private final EnrollmentRepository enrollmentRepository;
    private final StageRepository stageRepository;
    private final ClassRepository classRepository;
    private final ProgramRepository programRepository;

    @Transactional
    public Map<String, Integer> cleanupSeedData() {
        Map<String, Integer> counts = new HashMap<>();

        // 1) Delete people created by seed (email prefix 'candidate')
        List<PeopleModel> seededPeople = peopleRepository.findByEmailStartingWith("candidate");
        counts.put("peopleFound", seededPeople.size());

        List<Long> peopleIds = seededPeople.stream().map(PeopleModel::getId).collect(Collectors.toList());

        int stageCandidatesDeleted = 0;
        int enrollmentsDeleted = 0;

        if (!peopleIds.isEmpty()) {
            for (Long pid : peopleIds) {
                List<StageCandidateModel> sc = stageCandidateRepository.findByPeopleId(pid);
                stageCandidatesDeleted += sc.size();
                if (!sc.isEmpty()) stageCandidateRepository.deleteAll(sc);

                List<EnrollmentModel> ens = enrollmentRepository.findByPeopleId(pid);
                enrollmentsDeleted += ens.size();
                if (!ens.isEmpty()) enrollmentRepository.deleteAll(ens);
            }

            peopleRepository.deleteAll(seededPeople);
        }

        counts.put("stageCandidatesDeleted", stageCandidatesDeleted);
        counts.put("enrollmentsDeleted", enrollmentsDeleted);
        counts.put("peopleDeleted", seededPeople.size());

        // 2) Delete seed class, stages and program if present
        Optional<ClassModel> optClass = classRepository.findByCode("SEED-CLASS-2026");
        if (optClass.isPresent()) {
            ClassModel cls = optClass.get();
            List<StageModel> stages = stageRepository.findByClassModelId(cls.getId());

            int stagesDeleted = 0;
            int scByStageDeleted = 0;
            for (StageModel s : stages) {
                List<StageCandidateModel> scs = stageCandidateRepository.findByStageId(s.getId());
                scByStageDeleted += scs.size();
                if (!scs.isEmpty()) stageCandidateRepository.deleteAll(scs);
            }

            stageRepository.deleteAll(stages);
            stagesDeleted = stages.size();

            List<EnrollmentModel> ensByClass = enrollmentRepository.findByClassModelId(cls.getId());
            int ensByClassCnt = ensByClass.size();
            if (!ensByClass.isEmpty()) enrollmentRepository.deleteAll(ensByClass);

            classRepository.delete(cls);

            counts.put("stagesDeleted", stagesDeleted);
            counts.put("stageCandidatesByStageDeleted", scByStageDeleted);
            counts.put("enrollmentsByClassDeleted", ensByClassCnt);
            counts.put("classDeleted", 1);

            Optional<ProgramModel> optProg = programRepository.findByCode("SEED-PROG-2026");
            if (optProg.isPresent()) {
                ProgramModel prog = optProg.get();
                long classesLeft = classRepository.countByProgramId(prog.getId());
                if (classesLeft == 0) {
                    programRepository.delete(prog);
                    counts.put("programDeleted", 1);
                } else {
                    counts.put("programDeleted", 0);
                }
            } else {
                counts.put("programDeleted", 0);
            }
        } else {
            counts.put("stagesDeleted", 0);
            counts.put("stageCandidatesByStageDeleted", 0);
            counts.put("enrollmentsByClassDeleted", 0);
            counts.put("classDeleted", 0);
            counts.put("programDeleted", 0);
        }

        return counts;
    }
}
