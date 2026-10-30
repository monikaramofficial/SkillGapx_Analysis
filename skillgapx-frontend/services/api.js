/**
 * SkillGapX - REST API Client for Future Java Spring Boot Backend
 * 
 * Base URL is configured through the environment variable NEXT_PUBLIC_API_URL.
 * When the Spring Boot backend is developed and launched, these functions
 * can be invoked seamlessly across the application.
 */

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8081/api";

/**
 * Helper to get default headers with optional auth token
 */
const getHeaders = (token = null) => {
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  return headers;
};

/**
 * Generic fetch wrapper with error handling
 */
async function request(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`;
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP Error: ${response.status} ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`API Error [${endpoint}]:`, error);
    throw error;
  }
}

// ============================================================================
// Student Authentication & Profile APIs
// ============================================================================

/**
 * Authenticate student with the Spring Boot backend
 * @param {Object} credentials - { email, password }
 */
export async function login(credentials) {
  return request("/auth/login", {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(credentials),
  });
}

/**
 * Register a new student with the Spring Boot backend
 * @param {Object} studentData - { fullName, email, password }
 */
export async function register(studentData) {
  return request("/auth/register", {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(studentData),
  });
}

/**
 * Fetch student profile details
 * @param {string} studentId
 * @param {string} token
 */
export async function getStudentProfile(studentId, token = null) {
  return request(`/students/${studentId}`, {
    method: "GET",
    headers: getHeaders(token),
  });
}

// ============================================================================
// Skills & Skill Gap Analysis APIs
// ============================================================================

/**
 * Fetch list of verified skills and target industry standards
 * @param {string} studentId
 * @param {string} token
 */
export async function getSkills(studentId, token = null) {
  return request(`/skills/student/${studentId}`, {
    method: "GET",
    headers: getHeaders(token),
  });
}

/**
 * Fetch calculated skill gap metrics computed by the AI backend
 * @param {string} studentId
 * @param {string} token
 */
export async function getSkillGap(studentId, token = null) {
  return request(`/skills/gap-analysis/${studentId}`, {
    method: "GET",
    headers: getHeaders(token),
  });
}

// ============================================================================
// Assessment APIs
// ============================================================================

/**
 * Fetch skill assessment questions (optionally filtered by domain/role)
 * @param {string} domain - e.g., 'Java', 'FullStack', 'DataScience'
 * @param {string} token
 */
export async function getAssessment(domain = "general", token = null) {
  return request(`/assessments/questions?domain=${encodeURIComponent(domain)}`, {
    method: "GET",
    headers: getHeaders(token),
  });
}

/**
 * Submit student assessment responses for AI evaluation
 * @param {Object} payload - { studentId, assessmentId, answers: [...] }
 * @param {string} token
 */
export async function submitAssessment(payload, token = null) {
  return request("/assessments/submit", {
    method: "POST",
    headers: getHeaders(token),
    body: JSON.stringify(payload),
  });
}

/**
 * Fetch assessment score and placement readiness results
 * @param {string} assessmentId
 * @param {string} token
 */
export async function getResults(assessmentId, token = null) {
  return request(`/assessments/results/${assessmentId}`, {
    method: "GET",
    headers: getHeaders(token),
  });
}

// ============================================================================
// Career Recommendation & Roadmap APIs
// ============================================================================

/**
 * Fetch AI-driven career recommendations based on student skills and trends
 * @param {string} studentId
 * @param {string} token
 */
export async function getCareerRecommendations(studentId, token = null) {
  return request(`/career/recommendations/${studentId}`, {
    method: "GET",
    headers: getHeaders(token),
  });
}

/**
 * Fetch personalized step-by-step learning roadmap
 * @param {string} studentId
 * @param {string} targetRole
 * @param {string} token
 */
export async function getLearningRoadmap(studentId, targetRole = "Full Stack Developer", token = null) {
  return request(`/roadmap/${studentId}?role=${encodeURIComponent(targetRole)}`, {
    method: "GET",
    headers: getHeaders(token),
  });
}

// Default export object containing all service methods
const api = {
  login,
  register,
  getStudentProfile,
  getSkills,
  getAssessment,
  submitAssessment,
  getSkillGap,
  getCareerRecommendations,
  getLearningRoadmap,
  getResults,
};

export default api;
