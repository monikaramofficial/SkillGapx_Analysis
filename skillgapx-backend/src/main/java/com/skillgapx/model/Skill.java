package com.skillgapx.model;

import jakarta.persistence.*;

/**
 * Skill Entity - Master table of technical skills with industry benchmarks.
 * Example: Java (required_score=88, category=Backend)
 */
@Entity
@Table(name = "skills")
public class Skill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "skill_name", nullable = false, length = 50)
    private String skillName;

    @Column(length = 30)
    private String category; // Backend, Frontend, Database, Core CS, Tools

    @Column(name = "required_score")
    private int requiredScore; // Industry hiring benchmark (out of 100)

    @Column(length = 255)
    private String description;

    // Default constructor
    public Skill() {
        this.requiredScore = 80;
    }

    public Skill(String skillName, String category, int requiredScore, String description) {
        this.skillName = skillName;
        this.category = category;
        this.requiredScore = requiredScore;
        this.description = description;
    }

    // ======================== Getters & Setters ========================

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getSkillName() { return skillName; }
    public void setSkillName(String skillName) { this.skillName = skillName; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public int getRequiredScore() { return requiredScore; }
    public void setRequiredScore(int requiredScore) { this.requiredScore = requiredScore; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
}
