package com.skillgapx.dto;

import java.util.List;

/**
 * DTO for skill gap analysis response.
 */
public class SkillGapDTO {

    private Long studentId;
    private int overallSkillScore;
    private int placementReadiness;
    private int totalSkills;
    private int skillGapsCount;
    private List<SkillDTO> skills;
    private List<String> criticalGaps; // Skill names with largest gaps

    public SkillGapDTO() {}

    // ======================== Getters & Setters ========================

    public Long getStudentId() { return studentId; }
    public void setStudentId(Long studentId) { this.studentId = studentId; }

    public int getOverallSkillScore() { return overallSkillScore; }
    public void setOverallSkillScore(int overallSkillScore) { this.overallSkillScore = overallSkillScore; }

    public int getPlacementReadiness() { return placementReadiness; }
    public void setPlacementReadiness(int placementReadiness) { this.placementReadiness = placementReadiness; }

    public int getTotalSkills() { return totalSkills; }
    public void setTotalSkills(int totalSkills) { this.totalSkills = totalSkills; }

    public int getSkillGapsCount() { return skillGapsCount; }
    public void setSkillGapsCount(int skillGapsCount) { this.skillGapsCount = skillGapsCount; }

    public List<SkillDTO> getSkills() { return skills; }
    public void setSkills(List<SkillDTO> skills) { this.skills = skills; }

    public List<String> getCriticalGaps() { return criticalGaps; }
    public void setCriticalGaps(List<String> criticalGaps) { this.criticalGaps = criticalGaps; }
}
