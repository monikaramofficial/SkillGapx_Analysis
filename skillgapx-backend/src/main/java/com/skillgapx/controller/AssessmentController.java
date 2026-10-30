package com.skillgapx.controller;

import com.skillgapx.dto.AssessmentResultDTO;
import com.skillgapx.dto.AssessmentSubmitRequest;
import com.skillgapx.model.Question;
import com.skillgapx.service.AssessmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * AssessmentController - Handles assessment questions, submission, and results.
 * Endpoints:
 *   GET  /api/assessments/questions?domain=
 *   POST /api/assessments/submit
 *   GET  /api/assessments/results/{id}
 */
@RestController
@RequestMapping("/assessments")
public class AssessmentController {

    @Autowired
    private AssessmentService assessmentService;

    /**
     * GET /api/assessments/questions?domain=general
     * Fetch assessment questions optionally filtered by domain.
     */
    @GetMapping("/questions")
    public ResponseEntity<List<Question>> getQuestions(
            @RequestParam(defaultValue = "general") String domain) {
        List<Question> questions = assessmentService.getQuestions(domain);
        return ResponseEntity.ok(questions);
    }

    /**
     * POST /api/assessments/submit
     * Submit student answers and receive scored diagnostic results.
     */
    @PostMapping("/submit")
    public ResponseEntity<?> submitAssessment(@RequestBody AssessmentSubmitRequest request) {
        try {
            AssessmentResultDTO result = assessmentService.submitAndScore(request);
            return ResponseEntity.ok(result);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", e.getMessage()));
        }
    }

    /**
     * GET /api/assessments/results/{id}
     * Retrieve a previously stored assessment result.
     */
    @GetMapping("/results/{resultId}")
    public ResponseEntity<?> getResult(@PathVariable Long resultId) {
        try {
            AssessmentResultDTO result = assessmentService.getResultById(resultId);
            return ResponseEntity.ok(result);
        } catch (RuntimeException e) {
            return ResponseEntity.status(404)
                    .body(Map.of("message", e.getMessage()));
        }
    }
}
