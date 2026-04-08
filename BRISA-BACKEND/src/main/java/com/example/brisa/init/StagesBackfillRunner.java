package com.example.brisa.init;

import com.example.brisa.models.ClassModel;
import com.example.brisa.models.StageModel;
import com.example.brisa.repositories.ClassRepository;
import com.example.brisa.repositories.StageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Component
@RequiredArgsConstructor
public class StagesBackfillRunner implements CommandLineRunner {

    private final ClassRepository classRepository;
    private final StageRepository stageRepository;

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        List<ClassModel> classes = classRepository.findAll();
        if (classes == null || classes.isEmpty()) return;

        for (ClassModel cls : classes) {
            Long classId = cls.getId();

            if (classId == null) continue;

            // SELECAO
            if (stageRepository.findByNameAndClassModelId("SELECAO", classId).isEmpty()) {
                StageModel s = new StageModel();
                s.setName("SELECAO");
                s.setClassModel(cls);
                s.setDescription("Etapa automática: Seleção");
                stageRepository.save(s);
            }

            // NIVELAMENTO
            if (stageRepository.findByNameAndClassModelId("NIVELAMENTO", classId).isEmpty()) {
                StageModel s = new StageModel();
                s.setName("NIVELAMENTO");
                s.setClassModel(cls);
                s.setDescription("Etapa automática: Nivelamento");
                stageRepository.save(s);
            }

            // IMERSAO
            if (stageRepository.findByNameAndClassModelId("IMERSAO", classId).isEmpty()) {
                StageModel s = new StageModel();
                s.setName("IMERSAO");
                s.setClassModel(cls);
                s.setDescription("Etapa automática: Imersão");
                stageRepository.save(s);
            }
        }
    }
}
