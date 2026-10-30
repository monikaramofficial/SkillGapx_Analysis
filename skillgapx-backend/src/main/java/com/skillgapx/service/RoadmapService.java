package com.skillgapx.service;

import com.skillgapx.dto.RoadmapDTO;
import com.skillgapx.dto.SkillDTO;
import com.skillgapx.model.StudentSkill;
import com.skillgapx.repository.StudentSkillRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

/**
 * RoadmapService - Generates personalized 6-week learning roadmaps.
 *
 * Algorithm:
 * 1. Identify the student's skill gaps sorted by severity (largest gap first)
 * 2. Map each gap to a focused week of study
 * 3. Assign curated resources for each topic
 * 4. Generate progress indicators based on current score vs required
 */
@Service
public class RoadmapService {

    @Autowired
    private StudentSkillRepository studentSkillRepository;

    // Curated resource map for MCA technical skills
    private static final Map<String, String> RESOURCES = new HashMap<>();
    static {
        RESOURCES.put("Java", "Oracle Java Documentation & Baeldung Guides");
        RESOURCES.put("Python", "Python.org Official Tutorial & Real Python");
        RESOURCES.put("SQL", "Use The Index, Luke (SQL Indexing & Query Optimization)");
        RESOURCES.put("HTML", "MDN Web Docs - HTML Reference");
        RESOURCES.put("CSS", "MDN Web Docs - CSS Reference & Flexbox Guide");
        RESOURCES.put("JavaScript", "JavaScript.info Modern Tutorial");
        RESOURCES.put("React", "React Official Docs & Next.js Learn");
        RESOURCES.put("Spring Boot", "Spring.io Official Guides & Amigoscode");
        RESOURCES.put("Git", "Pro Git Book by Scott Chacon");
        RESOURCES.put("Data Structures", "GeeksForGeeks DSA Self Paced & Abdul Bari Algorithms");
    }

    /**
     * Generate a personalized 6-week learning roadmap for a student
     */
    public List<RoadmapDTO> generateRoadmap(Long studentId, String targetRole) {
        List<StudentSkill> studentSkills = studentSkillRepository.findByStudentId(studentId);

        // Calculate gaps and sort by largest gap first (highest priority)
        List<SkillGapEntry> gaps = studentSkills.stream()
                .map(ss -> new SkillGapEntry(
                        ss.getSkill().getSkillName(),
                        ss.getCurrentScore(),
                        ss.getSkill().getRequiredScore()
                ))
                .filter(g -> g.gap > 0) // Only include skills with gaps
                .sorted(Comparator.comparingInt((SkillGapEntry g) -> g.gap).reversed())
                .collect(Collectors.toList());

        // Also add a capstone project week
        List<RoadmapDTO> roadmap = new ArrayList<>();
        int weekCount = 0;

        for (SkillGapEntry gap : gaps) {
            if (weekCount >= 5) break; // Reserve week 6 for capstone
            weekCount++;

            String topic = gap.skillName + " Advanced Concepts";
            String resource = RESOURCES.getOrDefault(gap.skillName, "Self-study guide");
            int progress = calculateProgress(gap.currentScore, gap.requiredScore);
            String status = determineStatus(weekCount, gaps.size());

            roadmap.add(new RoadmapDTO(
                    "Week " + weekCount,
                    topic,
                    gap.skillName,
                    progress,
                    status,
                    resource
            ));
        }

        // If fewer than 5 gap weeks, fill remaining with enrichment
        while (weekCount < 5) {
            weekCount++;
            roadmap.add(new RoadmapDTO(
                    "Week " + weekCount,
                    "Enrichment & Practice",
                    "Full Stack",
                    0,
                    "Upcoming",
                    "LeetCode & HackerRank Practice"
            ));
        }

        // Week 6: Always a capstone/project week
        roadmap.add(new RoadmapDTO(
                "Week 6",
                "Build Full Stack Capstone Project",
                "Spring Boot + React",
                0,
                "Upcoming",
                "Build & deploy a live project with " + (targetRole != null ? targetRole : "Full Stack") + " focus"
        ));

        return roadmap;
    }

    /**
     * Calculate study progress based on how much of the gap has been closed
     */
    private int calculateProgress(int current, int required) {
        if (required <= 0) return 100;
        int ratio = (current * 100) / required;
        return Math.min(ratio, 100);
    }

    /**
     * Determine the status label for a roadmap week
     */
    private String determineStatus(int weekNumber, int totalGaps) {
        if (weekNumber == 1) return "In Progress";
        if (weekNumber <= 2) return "In Progress";
        return "Upcoming";
    }

    /**
     * Internal helper class for gap sorting
     */
    private static class SkillGapEntry {
        String skillName;
        int currentScore;
        int requiredScore;
        int gap;

        SkillGapEntry(String skillName, int currentScore, int requiredScore) {
            this.skillName = skillName;
            this.currentScore = currentScore;
            this.requiredScore = requiredScore;
            this.gap = Math.max(0, requiredScore - currentScore);
        }
    }
}
