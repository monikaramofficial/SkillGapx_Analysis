package com.skillgapx.dto;

/**
 * DTO for login response - returns JWT token and student info.
 */
public class LoginResponse {

    private String token;
    private Long studentId;
    private String fullName;
    private String email;
    private String message;

    public LoginResponse() {}

    public LoginResponse(String token, Long studentId, String fullName, String email) {
        this.token = token;
        this.studentId = studentId;
        this.fullName = fullName;
        this.email = email;
        this.message = "Login successful";
    }

    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }

    public Long getStudentId() { return studentId; }
    public void setStudentId(Long studentId) { this.studentId = studentId; }

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
}
