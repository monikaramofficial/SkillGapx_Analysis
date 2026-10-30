package com.skillgapx.service;

import com.skillgapx.dto.StudentProfileDTO;
import com.skillgapx.model.Student;
import com.skillgapx.model.StudentSkill;
import com.skillgapx.repository.StudentRepository;
import com.skillgapx.repository.StudentSkillRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * StudentService - Retrieves student profile with computed analytics.
 */
@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private StudentSkillRepository studentSkillRepository;

    /**
     * Get student profile with computed skill score and readiness metrics
     */
    public StudentProfileDTO getStudentProfile(Long studentId) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found with ID: " + studentId));

        List<StudentSkill> studentSkills = studentSkillRepository.findByStudentId(studentId);

        // Compute overall skill score (average of all current scores)
        int overallScore = 0;
        int totalGaps = 0;

        if (!studentSkills.isEmpty()) {
            int totalScore = 0;
            for (StudentSkill ss : studentSkills) {
                totalScore += ss.getCurrentScore();
                int gap = ss.getSkill().getRequiredScore() - ss.getCurrentScore();
                if (gap > 0) {
                    totalGaps++;
                }
            }
            overallScore = totalScore / studentSkills.size();
        }

        // Compute placement readiness (weighted formula)
        int readinessScore = (int) (overallScore * 0.92); // Simplified readiness

        // Build profile DTO
        StudentProfileDTO dto = new StudentProfileDTO();
        dto.setId(student.getId());
        dto.setFullName(student.getFullName());
        dto.setEmail(student.getEmail());
        dto.setDegree(student.getDegree());
        dto.setOverallSkillScore(overallScore);
        dto.setReadinessScore(readinessScore);
        dto.setTotalSkills(studentSkills.size());
        dto.setSkillGaps(totalGaps);

        return dto;
    }
}
