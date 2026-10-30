package com.skillgapx.controller;

import com.skillgapx.dto.RoadmapDTO;
import com.skillgapx.service.RoadmapService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * RoadmapController - Handles personalized learning roadmap endpoint.
 * Endpoint: GET /api/roadmap/{studentId}?role=Full+Stack+Developer
 */
@RestController
@RequestMapping("/roadmap")
public class RoadmapController {

    @Autowired
    private RoadmapService roadmapService;

    /**
     * GET /api/roadmap/{studentId}?role=Full Stack Developer
     * Generate a personalized 6-week learning roadmap.
     */
    @GetMapping("/{studentId}")
    public ResponseEntity<List<RoadmapDTO>> getRoadmap(
            @PathVariable Long studentId,
            @RequestParam(defaultValue = "Full Stack Developer") String role) {
        List<RoadmapDTO> roadmap = roadmapService.generateRoadmap(studentId, role);
        return ResponseEntity.ok(roadmap);
    }
}
