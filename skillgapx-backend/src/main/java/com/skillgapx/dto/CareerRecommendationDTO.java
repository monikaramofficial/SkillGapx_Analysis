package com.skillgapx.dto;

import java.util.List;

/**
 * DTO for AI career recommendation response.
 */
public class CareerRecommendationDTO {

    private String title;
    private int matchPercentage;
    private String hiringDemand;
    private List<String> requiredSkills;
    private List<String> matchingSkills;
    private List<String> missingSkills;
    private String recommendation;

    public CareerRecommendationDTO() {}

    // ======================== Getters & Setters ========================

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public int getMatchPercentage() { return matchPercentage; }
    public void setMatchPercentage(int matchPercentage) { this.matchPercentage = matchPercentage; }

    public String getHiringDemand() { return hiringDemand; }
    public void setHiringDemand(String hiringDemand) { this.hiringDemand = hiringDemand; }

    public List<String> getRequiredSkills() { return requiredSkills; }
    public void setRequiredSkills(List<String> requiredSkills) { this.requiredSkills = requiredSkills; }

    public List<String> getMatchingSkills() { return matchingSkills; }
    public void setMatchingSkills(List<String> matchingSkills) { this.matchingSkills = matchingSkills; }

    public List<String> getMissingSkills() { return missingSkills; }
    public void setMissingSkills(List<String> missingSkills) { this.missingSkills = missingSkills; }

    public String getRecommendation() { return recommendation; }
    public void setRecommendation(String recommendation) { this.recommendation = recommendation; }
}
