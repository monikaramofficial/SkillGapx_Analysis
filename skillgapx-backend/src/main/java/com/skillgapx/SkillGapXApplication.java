package com.skillgapx;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * SkillGapX – AI-Based Student Skill Verification, Gap Analysis
 * and Placement Readiness Prediction System
 *
 * Main Spring Boot Application entry point.
 * MCA Final Year Capstone Project.
 */
@SpringBootApplication
public class SkillGapXApplication {

    public static void main(String[] args) {
        SpringApplication.run(SkillGapXApplication.class, args);
        System.out.println("==============================================");
        System.out.println("  SkillGapX Backend Started Successfully!");
        System.out.println("  API Base URL: http://localhost:8081/api");
        System.out.println("  H2 Console:   http://localhost:8081/h2-console");
        System.out.println("==============================================");
    }

    @org.springframework.context.annotation.Bean
    org.springframework.boot.CommandLineRunner initDemoUser(
            com.skillgapx.repository.StudentRepository studentRepository,
            org.springframework.security.crypto.password.PasswordEncoder passwordEncoder) {
        return args -> {
            studentRepository.findByEmail("student@mca.edu").ifPresent(student -> {
                student.setPassword(passwordEncoder.encode("password123"));
                studentRepository.save(student);
            });
        };
    }
}
