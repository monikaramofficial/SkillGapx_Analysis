package com.skillgapx.dto;

/**
 * DTO for individual learning roadmap week entry.
 */
public class RoadmapDTO {

    private String week;
    private String topic;
    private String skill;
    private int progress;
    private String status; // Completed, In Progress, Upcoming
    private String recommendedResource;

    public RoadmapDTO() {}

    public RoadmapDTO(String week, String topic, String skill, int progress, String status, String recommendedResource) {
        this.week = week;
        this.topic = topic;
        this.skill = skill;
        this.progress = progress;
        this.status = status;
        this.recommendedResource = recommendedResource;
    }

    // ======================== Getters & Setters ========================

    public String getWeek() { return week; }
    public void setWeek(String week) { this.week = week; }

    public String getTopic() { return topic; }
    public void setTopic(String topic) { this.topic = topic; }

    public String getSkill() { return skill; }
    public void setSkill(String skill) { this.skill = skill; }

    public int getProgress() { return progress; }
    public void setProgress(int progress) { this.progress = progress; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getRecommendedResource() { return recommendedResource; }
    public void setRecommendedResource(String recommendedResource) { this.recommendedResource = recommendedResource; }
}
