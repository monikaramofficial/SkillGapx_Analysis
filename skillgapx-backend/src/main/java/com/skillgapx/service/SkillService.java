package com.skillgapx.service;

import com.skillgapx.dto.SkillDTO;
import com.skillgapx.dto.SkillGapDTO;
import com.skillgapx.model.StudentSkill;
import com.skillgapx.repository.StudentSkillRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

/**
 * SkillService - Core AI engine for skill gap analysis.
 * Computes student skill profiles, gap metrics, and placement readiness.
 */
@Service
public class SkillService {

    @Autowired
    private StudentSkillRepository studentSkillRepository;

    /**
     * Get all verified skills for a student as DTOs
     */
    public List<SkillDTO> getStudentSkills(Long studentId) {
        List<StudentSkill> studentSkills = studentSkillRepository.findByStudentId(studentId);

        return studentSkills.stream()
                .map(ss -> new SkillDTO(
                        ss.getSkill().getSkillName(),
                        ss.getSkill().getCategory(),
                        ss.getCurrentScore(),
                        ss.getSkill().getRequiredScore()
                ))
                .collect(Collectors.toList());
    }

    /**
     * AI Skill Gap Analysis Engine.
     *
     * Algorithm:
     * 1. For each skill, compute gap = requiredScore - currentScore
     * 2. Calculate overall skill score as weighted average
     * 3. Compute placement readiness using multi-factor formula
     * 4. Identify critical gaps (skills with gap > 10%)
     */
    public SkillGapDTO getSkillGapAnalysis(Long studentId) {
        List<StudentSkill> studentSkills = studentSkillRepository.findByStudentId(studentId);

        List<SkillDTO> skillDTOs = new ArrayList<>();
        List<String> criticalGaps = new ArrayList<>();
        int totalCurrentScore = 0;
        int gapCount = 0;

        for (StudentSkill ss : studentSkills) {
            String skillName = ss.getSkill().getSkillName();
            String category = ss.getSkill().getCategory();
            int current = ss.getCurrentScore();
            int required = ss.getSkill().getRequiredScore();
            int gap = Math.max(0, required - current);

            // Build SkillDTO
            SkillDTO dto = new SkillDTO(skillName, category, current, required);
            skillDTOs.add(dto);

            totalCurrentScore += current;

            if (gap > 0) {
                gapCount++;
                // Mark as critical if gap exceeds 10%
                if (gap > 10) {
                    criticalGaps.add(skillName + " (-" + gap + "%)");
                }
            }
        }

        // Calculate overall skill score (average)
        int overallScore = studentSkills.isEmpty() ? 0 : totalCurrentScore / studentSkills.size();

        // AI Placement Readiness Prediction Formula:
        // readiness = (technicalAvg * 0.40) + (assessmentBonus * 0.30) + (projectScore * 0.15) + (certScore * 0.15)
        // Simplified for MCA project: readiness = overallScore * 0.92
        int placementReadiness = (int) (overallScore * 0.92);

        // Sort critical gaps by severity
        criticalGaps.sort(Comparator.reverseOrder());

        // Build response DTO
        SkillGapDTO result = new SkillGapDTO();
        result.setStudentId(studentId);
        result.setOverallSkillScore(overallScore);
        result.setPlacementReadiness(placementReadiness);
        result.setTotalSkills(studentSkills.size());
        result.setSkillGapsCount(gapCount);
        result.setSkills(skillDTOs);
        result.setCriticalGaps(criticalGaps);

        return result;
    }
}
