package com.skillgapx.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

/**
 * StudentSkill Entity - Junction table mapping students to skills with scores.
 * Represents a student's verified proficiency level in a specific skill.
 */
@Entity
@Table(name = "student_skills")
public class StudentSkill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "skill_id", nullable = false)
    private Skill skill;

    @Column(name = "current_score")
    private int currentScore; // Student's verified score (out of 100)

    @Column(name = "skill_level", length = 20)
    private String skillLevel; // Beginner, Intermediate, Advanced

    @Column(name = "verified_at")
    private LocalDateTime verifiedAt;

    // Default constructor
    public StudentSkill() {
        this.currentScore = 0;
        this.skillLevel = "Beginner";
        this.verifiedAt = LocalDateTime.now();
    }

    public StudentSkill(Student student, Skill skill, int currentScore) {
        this();
        this.student = student;
        this.skill = skill;
        this.currentScore = currentScore;
        this.skillLevel = calculateLevel(currentScore);
    }

    /**
     * AI logic: Determine skill level based on score thresholds
     */
    public static String calculateLevel(int score) {
        if (score >= 80) return "Advanced";
        if (score >= 60) return "Intermediate";
        return "Beginner";
    }

    // ======================== Getters & Setters ========================

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Student getStudent() { return student; }
    public void setStudent(Student student) { this.student = student; }

    public Skill getSkill() { return skill; }
    public void setSkill(Skill skill) { this.skill = skill; }

    public int getCurrentScore() { return currentScore; }
    public void setCurrentScore(int currentScore) {
        this.currentScore = currentScore;
        this.skillLevel = calculateLevel(currentScore);
    }

    public String getSkillLevel() { return skillLevel; }
    public void setSkillLevel(String skillLevel) { this.skillLevel = skillLevel; }

    public LocalDateTime getVerifiedAt() { return verifiedAt; }
    public void setVerifiedAt(LocalDateTime verifiedAt) { this.verifiedAt = verifiedAt; }
}
