package com.skillgapx.model;

import jakarta.persistence.*;

/**
 * CareerRole Entity - Master table of IT career roles for AI recommendation matching.
 * Each role has required skills, demand level, and description.
 */
@Entity
@Table(name = "career_roles")
public class CareerRole {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 100)
    private String title;

    @Column(name = "required_skills", columnDefinition = "TEXT")
    private String requiredSkills; // Comma-separated skill names

    @Column(name = "hiring_demand", length = 20)
    private String hiringDemand; // Very High, High, Medium

    @Column(columnDefinition = "TEXT")
    private String description;

    // Default constructor
    public CareerRole() {}

    public CareerRole(String title, String requiredSkills, String hiringDemand, String description) {
        this.title = title;
        this.requiredSkills = requiredSkills;
        this.hiringDemand = hiringDemand;
        this.description = description;
    }

    // ======================== Getters & Setters ========================

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getRequiredSkills() { return requiredSkills; }
    public void setRequiredSkills(String requiredSkills) { this.requiredSkills = requiredSkills; }

    public String getHiringDemand() { return hiringDemand; }
    public void setHiringDemand(String hiringDemand) { this.hiringDemand = hiringDemand; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
}
