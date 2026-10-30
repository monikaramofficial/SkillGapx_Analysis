package com.skillgapx.dto;

/**
 * DTO for individual skill data in API responses.
 */
public class SkillDTO {

    private String skillName;
    private String category;
    private int currentScore;
    private int requiredScore;
    private int gap;
    private String level;

    public SkillDTO() {}

    public SkillDTO(String skillName, String category, int currentScore, int requiredScore) {
        this.skillName = skillName;
        this.category = category;
        this.currentScore = currentScore;
        this.requiredScore = requiredScore;
        this.gap = Math.max(0, requiredScore - currentScore);
        // Auto-determine level
        if (currentScore >= 80) this.level = "Advanced";
        else if (currentScore >= 60) this.level = "Intermediate";
        else this.level = "Beginner";
    }

    // ======================== Getters & Setters ========================

    public String getSkillName() { return skillName; }
    public void setSkillName(String skillName) { this.skillName = skillName; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public int getCurrentScore() { return currentScore; }
    public void setCurrentScore(int currentScore) { this.currentScore = currentScore; }

    public int getRequiredScore() { return requiredScore; }
    public void setRequiredScore(int requiredScore) { this.requiredScore = requiredScore; }

    public int getGap() { return gap; }
    public void setGap(int gap) { this.gap = gap; }

    public String getLevel() { return level; }
    public void setLevel(String level) { this.level = level; }
}
