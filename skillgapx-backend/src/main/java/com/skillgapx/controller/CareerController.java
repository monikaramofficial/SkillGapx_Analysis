package com.skillgapx.controller;

import com.skillgapx.dto.CareerRecommendationDTO;
import com.skillgapx.service.CareerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * CareerController - Handles AI career recommendation endpoint.
 * Endpoint: GET /api/career/recommendations/{studentId}
 */
@RestController
@RequestMapping("/career")
public class CareerController {

    @Autowired
    private CareerService careerService;

    /**
     * GET /api/career/recommendations/{studentId}
     * AI-powered career role matching based on student's skill profile.
     */
    @GetMapping("/recommendations/{studentId}")
    public ResponseEntity<List<CareerRecommendationDTO>> getRecommendations(
            @PathVariable Long studentId) {
        List<CareerRecommendationDTO> recommendations = careerService.getRecommendations(studentId);
        return ResponseEntity.ok(recommendations);
    }
}
