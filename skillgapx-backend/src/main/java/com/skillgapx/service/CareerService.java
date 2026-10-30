package com.skillgapx.service;

import com.skillgapx.dto.CareerRecommendationDTO;
import com.skillgapx.model.CareerRole;
import com.skillgapx.model.StudentSkill;
import com.skillgapx.repository.CareerRoleRepository;
import com.skillgapx.repository.StudentSkillRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

/**
 * CareerService - AI Career Recommendation Engine.
 *
 * Algorithm:
 * 1. Get student's verified skill set
 * 2. For each career role, compare its required skills against student's skills
 * 3. Calculate match percentage = (matchedSkills / totalRequiredSkills) x 100
 * 4. Generate recommendation text based on match strength
 * 5. Sort by match percentage descending
 */
@Service
public class CareerService {

    @Autowired
    private CareerRoleRepository careerRoleRepository;

    @Autowired
    private StudentSkillRepository studentSkillRepository;

    /**
     * Generate AI career recommendations for a student
     */
    public List<CareerRecommendationDTO> getRecommendations(Long studentId) {
        // Get student's verified skill names (scores >= 50 count as "has skill")
        List<StudentSkill> studentSkills = studentSkillRepository.findByStudentId(studentId);
        Set<String> studentSkillNames = studentSkills.stream()
                .filter(ss -> ss.getCurrentScore() >= 50) // Threshold: score ≥ 50 means student has the skill
                .map(ss -> ss.getSkill().getSkillName().toLowerCase().trim())
                .collect(Collectors.toSet());

        // Get all available career roles
        List<CareerRole> allRoles = careerRoleRepository.findAll();
        List<CareerRecommendationDTO> recommendations = new ArrayList<>();

        for (CareerRole role : allRoles) {
            // Parse the comma-separated required skills
            String[] requiredSkillsArr = role.getRequiredSkills().split(",");
            List<String> requiredSkills = Arrays.stream(requiredSkillsArr)
                    .map(String::trim)
                    .collect(Collectors.toList());

            List<String> matchingSkills = new ArrayList<>();
            List<String> missingSkills = new ArrayList<>();

            // Compare each required skill against student's verified skills
            for (String reqSkill : requiredSkills) {
                boolean found = studentSkillNames.stream()
                        .anyMatch(s -> s.contains(reqSkill.toLowerCase()) || reqSkill.toLowerCase().contains(s));
                if (found) {
                    matchingSkills.add(reqSkill);
                } else {
                    missingSkills.add(reqSkill);
                }
            }

            // Calculate match percentage
            int matchPercentage = requiredSkills.isEmpty() ? 0
                    : (matchingSkills.size() * 100) / requiredSkills.size();

            // Generate AI recommendation text based on match level
            String recommendation = generateRecommendation(role.getTitle(), matchPercentage, missingSkills);

            // Build DTO
            CareerRecommendationDTO dto = new CareerRecommendationDTO();
            dto.setTitle(role.getTitle());
            dto.setMatchPercentage(matchPercentage);
            dto.setHiringDemand(role.getHiringDemand());
            dto.setRequiredSkills(requiredSkills);
            dto.setMatchingSkills(matchingSkills);
            dto.setMissingSkills(missingSkills);
            dto.setRecommendation(recommendation);
            recommendations.add(dto);
        }

        // Sort by match percentage descending
        recommendations.sort((a, b) -> b.getMatchPercentage() - a.getMatchPercentage());
        return recommendations;
    }

    /**
     * Generate a human-readable AI recommendation based on match strength
     */
    private String generateRecommendation(String roleTitle, int matchPercentage, List<String> missingSkills) {
        if (matchPercentage >= 80) {
            return "Excellent match for " + roleTitle + "! You have strong alignment with this role. "
                    + "Focus on polishing " + (missingSkills.isEmpty() ? "interview skills" : missingSkills.get(0))
                    + " for placement interviews.";
        } else if (matchPercentage >= 60) {
            return "Good potential for " + roleTitle + ". Closing gaps in "
                    + String.join(", ", missingSkills)
                    + " will make you placement-ready for this role.";
        } else {
            return "Consider " + roleTitle + " as a future target. Significant upskilling needed in "
                    + String.join(", ", missingSkills)
                    + ". Focus on higher-match roles first for immediate placements.";
        }
    }
}
