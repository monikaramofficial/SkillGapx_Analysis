package com.skillgapx.dto;

/**
 * DTO for student profile responses.
 */
public class StudentProfileDTO {

    private Long id;
    private String fullName;
    private String email;
    private String degree;
    private int overallSkillScore;
    private int readinessScore;
    private int totalSkills;
    private int skillGaps;

    public StudentProfileDTO() {}

    // ======================== Getters & Setters ========================

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getDegree() { return degree; }
    public void setDegree(String degree) { this.degree = degree; }

    public int getOverallSkillScore() { return overallSkillScore; }
    public void setOverallSkillScore(int overallSkillScore) { this.overallSkillScore = overallSkillScore; }

    public int getReadinessScore() { return readinessScore; }
    public void setReadinessScore(int readinessScore) { this.readinessScore = readinessScore; }

    public int getTotalSkills() { return totalSkills; }
    public void setTotalSkills(int totalSkills) { this.totalSkills = totalSkills; }

    public int getSkillGaps() { return skillGaps; }
    public void setSkillGaps(int skillGaps) { this.skillGaps = skillGaps; }
}
