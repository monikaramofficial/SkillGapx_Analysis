package com.skillgapx.controller;

import com.skillgapx.dto.StudentProfileDTO;
import com.skillgapx.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * StudentController - Handles student profile retrieval.
 * Endpoint: GET /api/students/{id}
 */
@RestController
@RequestMapping("/students")
public class StudentController {

    @Autowired
    private StudentService studentService;

    /**
     * GET /api/students/{id}
     * Fetch student profile with computed analytics.
     */
    @GetMapping("/{id}")
    public ResponseEntity<?> getStudentProfile(@PathVariable Long id) {
        try {
            StudentProfileDTO profile = studentService.getStudentProfile(id);
            return ResponseEntity.ok(profile);
        } catch (RuntimeException e) {
            return ResponseEntity.status(404)
                    .body(Map.of("message", e.getMessage()));
        }
    }
}
