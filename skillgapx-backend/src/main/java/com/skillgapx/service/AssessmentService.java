package com.skillgapx.service;

import com.skillgapx.dto.AssessmentResultDTO;
import com.skillgapx.dto.AssessmentSubmitRequest;
import com.skillgapx.dto.SkillDTO;
import com.skillgapx.model.AssessmentResult;
import com.skillgapx.model.Question;
import com.skillgapx.model.Student;
import com.skillgapx.repository.AssessmentResultRepository;
import com.skillgapx.repository.QuestionRepository;
import com.skillgapx.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

/**
 * AssessmentService - Handles question retrieval, answer scoring, and result generation.
 */
@Service
public class AssessmentService {

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private AssessmentResultRepository resultRepository;

    @Autowired
    private StudentRepository studentRepository;

    /**
     * Get assessment questions, optionally filtered by domain
     */
    public List<Question> getQuestions(String domain) {
        if (domain == null || domain.equalsIgnoreCase("general") || domain.isEmpty()) {
            return questionRepository.findAll();
        }
        return questionRepository.findByDomain(domain);
    }

    /**
     * Score a submitted assessment and generate diagnostic results.
     *
     * Algorithm:
     * 1. Compare each answer against the correct option
     * 2. Track correct/incorrect by category
     * 3. Identify strengths (all correct in a category) and weaknesses
     * 4. Compute placement readiness score
     * 5. Persist result to database
     */
    public AssessmentResultDTO submitAndScore(AssessmentSubmitRequest request) {
        Student student = studentRepository.findById(request.getStudentId())
                .orElseThrow(() -> new RuntimeException("Student not found"));

        Map<Long, Integer> answers = request.getAnswers();
        List<Question> allQuestions = questionRepository.findAllById(answers.keySet());

        int correctCount = 0;
        Map<String, Integer> categoryCorrect = new HashMap<>();
        Map<String, Integer> categoryTotal = new HashMap<>();

        for (Question q : allQuestions) {
            String cat = q.getCategory();
            categoryTotal.merge(cat, 1, Integer::sum);

            Integer selected = answers.get(q.getId());
            if (selected != null && selected == q.getCorrectOption()) {
                correctCount++;
                categoryCorrect.merge(cat, 1, Integer::sum);
            }
        }

        int totalQuestions = allQuestions.size();
        int scorePercentage = totalQuestions > 0 ? (correctCount * 100) / totalQuestions : 0;
        int readinessScore = (int) (scorePercentage * 0.95);

        // Identify strengths and weaknesses by category
        List<String> strengths = new ArrayList<>();
        List<String> weaknesses = new ArrayList<>();
        List<String> recommendedSkills = new ArrayList<>();

        for (Map.Entry<String, Integer> entry : categoryTotal.entrySet()) {
            String cat = entry.getKey();
            int total = entry.getValue();
            int correct = categoryCorrect.getOrDefault(cat, 0);
            int catScore = (correct * 100) / total;

            if (catScore >= 75) {
                strengths.add(cat);
            } else {
                weaknesses.add(cat);
                recommendedSkills.add(cat);
            }
        }

        // Save result to database
        AssessmentResult result = new AssessmentResult();
        result.setStudent(student);
        result.setTotalQuestions(totalQuestions);
        result.setCorrectCount(correctCount);
        result.setScorePercentage(scorePercentage);
        result.setReadinessScore(readinessScore);
        result.setStrengths(String.join(",", strengths));
        result.setWeaknesses(String.join(",", weaknesses));
        result = resultRepository.save(result);

        // Build response DTO
        AssessmentResultDTO dto = new AssessmentResultDTO();
        dto.setResultId(result.getId());
        dto.setOverallScore(scorePercentage);
        dto.setTotalQuestions(totalQuestions);
        dto.setCorrectCount(correctCount);
        dto.setReadinessScore(readinessScore);
        dto.setStrengths(strengths);
        dto.setWeaknesses(weaknesses);
        dto.setRecommendedSkills(recommendedSkills);
        dto.setTakenAt(result.getTakenAt().toString());

        return dto;
    }

    /**
     * Retrieve a previously stored assessment result by ID
     */
    public AssessmentResultDTO getResultById(Long resultId) {
        AssessmentResult result = resultRepository.findById(resultId)
                .orElseThrow(() -> new RuntimeException("Assessment result not found"));

        AssessmentResultDTO dto = new AssessmentResultDTO();
        dto.setResultId(result.getId());
        dto.setOverallScore(result.getScorePercentage());
        dto.setTotalQuestions(result.getTotalQuestions());
        dto.setCorrectCount(result.getCorrectCount());
        dto.setReadinessScore(result.getReadinessScore());
        dto.setTakenAt(result.getTakenAt().toString());

        // Parse stored CSV strings back to lists
        if (result.getStrengths() != null && !result.getStrengths().isEmpty()) {
            dto.setStrengths(Arrays.asList(result.getStrengths().split(",")));
        } else {
            dto.setStrengths(new ArrayList<>());
        }
        if (result.getWeaknesses() != null && !result.getWeaknesses().isEmpty()) {
            dto.setWeaknesses(Arrays.asList(result.getWeaknesses().split(",")));
            dto.setRecommendedSkills(Arrays.asList(result.getWeaknesses().split(",")));
        } else {
            dto.setWeaknesses(new ArrayList<>());
            dto.setRecommendedSkills(new ArrayList<>());
        }

        return dto;
    }
}
