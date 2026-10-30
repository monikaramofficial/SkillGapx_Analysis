package com.skillgapx.controller;

import com.skillgapx.dto.SkillDTO;
import com.skillgapx.dto.SkillGapDTO;
import com.skillgapx.service.SkillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * SkillController - Handles skill retrieval and gap analysis endpoints.
 * Endpoints:
 *   GET /api/skills/student/{id}
 *   GET /api/skills/gap-analysis/{id}
 */
@RestController
@RequestMapping("/skills")
public class SkillController {

    @Autowired
    private SkillService skillService;

    /**
     * GET /api/skills/student/{id}
     * Fetch all verified skills for a student.
     */
    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<SkillDTO>> getStudentSkills(@PathVariable Long studentId) {
        List<SkillDTO> skills = skillService.getStudentSkills(studentId);
        return ResponseEntity.ok(skills);
    }

    /**
     * GET /api/skills/gap-analysis/{id}
     * AI Skill Gap Analysis - computes gaps, overall score, and placement readiness.
     */
    @GetMapping("/gap-analysis/{studentId}")
    public ResponseEntity<SkillGapDTO> getSkillGapAnalysis(@PathVariable Long studentId) {
        SkillGapDTO analysis = skillService.getSkillGapAnalysis(studentId);
        return ResponseEntity.ok(analysis);
    }
}
