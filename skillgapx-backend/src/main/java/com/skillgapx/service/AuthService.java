package com.skillgapx.service;

import com.skillgapx.config.JwtUtil;
import com.skillgapx.dto.LoginRequest;
import com.skillgapx.dto.LoginResponse;
import com.skillgapx.model.Student;
import com.skillgapx.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

/**
 * AuthService - Handles student login authentication and JWT token generation.
 */
@Service
public class AuthService {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    /**
     * Authenticate a student and return a JWT token
     */
    public LoginResponse login(LoginRequest request) {
        // Find student by email
        Student student = studentRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));

        // Verify password against BCrypt hash, with fallback for plain text
        boolean matches = false;
        try {
            matches = passwordEncoder.matches(request.getPassword(), student.getPassword());
        } catch (Exception ignored) {}

        if (!matches && student.getPassword() != null && student.getPassword().equals(request.getPassword())) {
            matches = true;
        }

        if (!matches) {
            throw new RuntimeException("Invalid email or password");
        }

        // Generate JWT token
        String token = jwtUtil.generateToken(student.getEmail(), student.getId());

        // Build and return login response
        return new LoginResponse(
                token,
                student.getId(),
                student.getFullName(),
                student.getEmail()
        );
    }

    /**
     * Register a new student (used during initial data setup or registration)
     */
    public Student registerStudent(String fullName, String email, String rawPassword) {
        // Check if email is already in use
        if (studentRepository.existsByEmail(email)) {
            throw new RuntimeException("A student with this email already exists");
        }

        Student student = new Student();
        student.setFullName(fullName);
        student.setEmail(email);
        student.setPassword(passwordEncoder.encode(rawPassword)); // BCrypt hash
        student.setDegree("MCA (Master of Computer Applications)");

        return studentRepository.save(student);
    }
}
