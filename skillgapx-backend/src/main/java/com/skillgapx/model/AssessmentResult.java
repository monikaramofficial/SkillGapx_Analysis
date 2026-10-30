package com.skillgapx.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

/**
 * AssessmentResult Entity - Stores scored assessment outcomes per student.
 * Includes strengths, weaknesses, and AI-computed placement readiness.
 */
@Entity
@Table(name = "assessment_results")
public class AssessmentResult {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    @Column(name = "total_questions")
    private int totalQuestions;

    @Column(name = "correct_count")
    private int correctCount;

    @Column(name = "score_percentage")
    private int scorePercentage;

    @Column(name = "readiness_score")
    private int readinessScore;

    @Column(columnDefinition = "TEXT")
    private String strengths; // JSON array of strong categories

    @Column(columnDefinition = "TEXT")
    private String weaknesses; // JSON array of weak categories

    @Column(name = "taken_at")
    private LocalDateTime takenAt;

    // Default constructor
    public AssessmentResult() {
        this.takenAt = LocalDateTime.now();
    }

    // ======================== Getters & Setters ========================

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Student getStudent() { return student; }
    public void setStudent(Student student) { this.student = student; }

    public int getTotalQuestions() { return totalQuestions; }
    public void setTotalQuestions(int totalQuestions) { this.totalQuestions = totalQuestions; }

    public int getCorrectCount() { return correctCount; }
    public void setCorrectCount(int correctCount) { this.correctCount = correctCount; }

    public int getScorePercentage() { return scorePercentage; }
    public void setScorePercentage(int scorePercentage) { this.scorePercentage = scorePercentage; }

    public int getReadinessScore() { return readinessScore; }
    public void setReadinessScore(int readinessScore) { this.readinessScore = readinessScore; }

    public String getStrengths() { return strengths; }
    public void setStrengths(String strengths) { this.strengths = strengths; }

    public String getWeaknesses() { return weaknesses; }
    public void setWeaknesses(String weaknesses) { this.weaknesses = weaknesses; }

    public LocalDateTime getTakenAt() { return takenAt; }
    public void setTakenAt(LocalDateTime takenAt) { this.takenAt = takenAt; }
}
