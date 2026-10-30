package com.skillgapx.dto;

import java.util.List;
import java.util.Map;

/**
 * DTO for assessment submission payload from the frontend.
 * Frontend sends: { studentId, answers: { questionId: selectedOptionIndex, ... } }
 */
public class AssessmentSubmitRequest {

    private Long studentId;
    private Map<Long, Integer> answers; // questionId -> selectedOptionIndex (0-3)

    public AssessmentSubmitRequest() {}

    public Long getStudentId() { return studentId; }
    public void setStudentId(Long studentId) { this.studentId = studentId; }

    public Map<Long, Integer> getAnswers() { return answers; }
    public void setAnswers(Map<Long, Integer> answers) { this.answers = answers; }
}
