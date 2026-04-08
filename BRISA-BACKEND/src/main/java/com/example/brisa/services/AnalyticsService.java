package com.example.brisa.services;

import com.example.brisa.dtos.analytics.CourseProgressionFunnelDTO;
import com.example.brisa.repositories.CourseProgressionRepository;
import com.example.brisa.repositories.StageRepository;
import com.example.brisa.models.StageModel;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AnalyticsService {

    private final CourseProgressionRepository courseProgressionRepository;
    private final StageRepository stageRepository;

    public List<CourseProgressionFunnelDTO> getCourseProgressionFunnel(Long classId) {
        return getCourseProgressionFunnel(classId, null, null);
    }

    public List<CourseProgressionFunnelDTO> getCourseProgressionFunnel(Long classId, Long stageId, String stageName) {
        List<Object[]> rows;

        if (stageId != null) {
            rows = courseProgressionRepository.countStatusByStage(stageId);
        } else if (stageName != null && classId != null) {
            var optStage = stageRepository.findByNameAndClassModelId(stageName, classId);
            if (optStage.isPresent()) {
                StageModel stage = optStage.get();
                rows = courseProgressionRepository.countStatusByStage(stage.getId());
            } else {
                rows = courseProgressionRepository.countStatusByClass(classId);
            }
        } else {
            rows = courseProgressionRepository.countStatusByClass(classId);
        }

        return rows.stream()
                .map(r -> new CourseProgressionFunnelDTO((String) r[0], ((Number) r[1]).longValue()))
                .collect(Collectors.toList());
    }
}
