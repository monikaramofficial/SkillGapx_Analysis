package com.skillgapx.dto;

import java.util.List;

/**
 * DTO for assessment result response.
 */
public class AssessmentResultDTO {

    private Long resultId;
    private int overallScore;
    private int totalQuestions;
    private int correctCount;
    private int readinessScore;
    private List<String> strengths;
    private List<String> weaknesses;
    private List<SkillDTO> skillScores;
    private List<String> recommendedSkills;
    private String takenAt;

    public AssessmentResultDTO() {}

    // ======================== Getters & Setters ========================

    public Long getResultId() { return resultId; }
    public void setResultId(Long resultId) { this.resultId = resultId; }

    public int getOverallScore() { return overallScore; }
    public void setOverallScore(int overallScore) { this.overallScore = overallScore; }

    public int getTotalQuestions() { return totalQuestions; }
    public void setTotalQuestions(int totalQuestions) { this.totalQuestions = totalQuestions; }

    public int getCorrectCount() { return correctCount; }
    public void setCorrectCount(int correctCount) { this.correctCount = correctCount; }

    public int getReadinessScore() { return readinessScore; }
    public void setReadinessScore(int readinessScore) { this.readinessScore = readinessScore; }

    public List<String> getStrengths() { return strengths; }
    public void setStrengths(List<String> strengths) { this.strengths = strengths; }

    public List<String> getWeaknesses() { return weaknesses; }
    public void setWeaknesses(List<String> weaknesses) { this.weaknesses = weaknesses; }

    public List<SkillDTO> getSkillScores() { return skillScores; }
    public void setSkillScores(List<SkillDTO> skillScores) { this.skillScores = skillScores; }

    public List<String> getRecommendedSkills() { return recommendedSkills; }
    public void setRecommendedSkills(List<String> recommendedSkills) { this.recommendedSkills = recommendedSkills; }

    public String getTakenAt() { return takenAt; }
    public void setTakenAt(String takenAt) { this.takenAt = takenAt; }
}
