# SkillGapX – AI-Based Student Skill Verification, Gap Analysis and Placement Readiness Prediction System

**MCA Final Year Capstone Project**

SkillGapX is an enterprise-grade full-stack platform engineered to benchmark MCA students' technical proficiencies against current IT recruitment standards. It features an automated **rule-based AI Skill Gap Analysis Engine**, **Career Role Matcher**, **Placement Readiness Predictor**, and **Dynamic 6-Week Learning Roadmap Generator**.

---

## 🏛️ System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    SkillGapX Platform                       │
└──────────────────────────────┬──────────────────────────────┘
                               │
       ┌───────────────────────┴───────────────────────┐
       ▼                                               ▼
┌──────────────────────────────┐        ┌──────────────────────────────┐
│       Next.js Frontend       │        │   Java Spring Boot Backend   │
│   (React, Tailwind, Turbopack)│       │   (Spring Boot 3.4.1, JPA)   │
│      http://localhost:3000   │        │     http://localhost:8081/api│
└──────────────┬───────────────┘        └──────────────┬───────────────┘
               │                                       │
               │ HTTP REST (CORS Enabled)              │
               │ Bearer JWT Authentication             │
               ▼                                       ▼
       ┌───────────────────────────────────────────────────────┐
       │             Database Layer (H2 / MySQL)               │
       │  • students          • skills        • student_skills │
       │  • questions         • assessment_results             │
       │  • career_roles      • H2 Console: /api/h2-console    │
       └───────────────────────────────────────────────────────┘
```

---

## 🚀 Quick Start (One Command)

To run both the Spring Boot backend and the Next.js frontend together:

```bash
cd "/Users/monikar/java project"
./start-all.sh
```

Or using npm:
```bash
npm run dev:all
```

### URLs & Ports
- **Frontend Web Application**: [http://localhost:3000](http://localhost:3000)
- **Backend REST API**: [http://localhost:8081/api](http://localhost:8081/api)
- **H2 In-Memory Database Console**: [http://localhost:8081/api/h2-console](http://localhost:8081/api/h2-console)
  - JDBC URL: `jdbc:h2:mem:skillgapxdb`
  - Username: `sa`
  - Password: *(blank)*

### Demo Account (Pre-Seeded)
- **Email**: `student@mca.edu`
- **Password**: `password123`
- *(You can also click the "Demo Student Login" button on the login screen for instant 1-click access!)*

---

## 🛠️ Technology Stack

| Layer | Technologies Used |
|---|---|
| **Frontend Framework** | Next.js 16 (App Router), React 19, JavaScript (JSX) |
| **Styling & UI** | Tailwind CSS v4, Lucide Icons, Glassmorphism design system |
| **Visualization** | Recharts / SVG Charts (Skill Benchmark vs Required Scores) |
| **Backend Framework** | Java 17/26, Spring Boot 3.4.1, Spring Data JPA, Hibernate ORM |
| **Security & Auth** | Spring Security, JJWT (HMAC-SHA512), BCrypt Password Hashing |
| **Databases** | H2 In-Memory (default for instant run), MySQL (profile included) |
| **Build Tools** | Maven 3.9+ (`skillgapx-backend`), npm (`skillgapx-frontend`) |

---

## 📡 REST API Endpoint Specifications

All endpoints are hosted at `http://localhost:8081/api`:

| Method | Endpoint | Description | Request Payload / Params |
|---|---|---|---|
| `POST` | `/api/auth/login` | Student Login & JWT Issuance | `{"email": "...", "password": "..."}` |
| `POST` | `/api/auth/register` | Register New Student | `{"fullName": "...", "email": "...", "password": "..."}` |
| `GET` | `/api/students/{id}` | Fetch Student Profile & Stats | Path variable: `id` |
| `GET` | `/api/skills/student/{id}` | List Student's Verified Skills | Path variable: `id` |
| `GET` | `/api/skills/gap-analysis/{id}` | Compute Skill Gaps vs Benchmarks | Path variable: `id` |
| `GET` | `/api/assessments/questions` | Fetch MCQ Questions | Query param: `?domain=Java` |
| `POST` | `/api/assessments/submit` | Submit MCQ Answers & Auto-Grade | `{"studentId": 1, "answers": {"1": 1, "2": 2}}` |
| `GET` | `/api/assessments/results/{id}`| Diagnostic Assessment Report | Path variable: `id` |
| `GET` | `/api/career/recommendations/{id}`| Skill-to-Role AI Matcher | Path variable: `id` |
| `GET` | `/api/roadmap/{id}` | Personalized 6-Week Action Plan | Query param: `?role=Full+Stack+Developer` |

---

## 🧮 AI & Analytic Mathematical Formulas

### 1. Skill Gap Calculation
For each skill $i$:
$$\text{Gap}_i = \max(0, \text{RequiredScore}_i - \text{CurrentScore}_i)$$

- $\text{Score}_i \ge 80 \implies \text{Advanced}$
- $60 \le \text{Score}_i < 80 \implies \text{Intermediate}$
- $\text{Score}_i < 60 \implies \text{Beginner}$

### 2. Weighted Placement Readiness Score
$$\text{Readiness} = (T \times 0.40) + (A \times 0.30) + (P \times 0.15) + (C \times 0.15)$$
Where:
- $T$ = Average of verified technical skill scores
- $A$ = Diagnostic MCQ assessment score percentage
- $P$ = Hands-on project portfolio score (defaulted to 75%)
- $C$ = Certifications score (defaulted to 70%)

### 3. Career Role Match Percentage
$$\text{Match \%} = \left(\frac{|\text{StudentSkills} \cap \text{RoleRequiredSkills}|}{|\text{RoleRequiredSkills}|}\right) \times 100$$

---

## 📂 Project Structure

```
java project/
├── start-all.sh                      # Unified 1-click startup script
├── package.json                      # Root workspace scripts
├── README.md                         # Project documentation
│
├── skillgapx-frontend/               # Next.js Frontend Application
│   ├── app/
│   │   ├── page.jsx                  # Landing page & feature showcase
│   │   ├── login/page.jsx            # Student login (Backend & Demo mode)
│   │   ├── register/page.jsx         # New student onboarding
│   │   ├── dashboard/page.jsx        # Analytics dashboard with live stats
│   │   ├── skills/page.jsx           # Technical skills inventory & charts
│   │   ├── assessment/page.jsx       # Adaptive MCQ diagnostic test
│   │   ├── results/page.jsx          # Test results & strengths/weaknesses
│   │   ├── career/page.jsx           # AI career role matchers
│   │   └── roadmap/page.jsx          # 6-Week personalized learning path
│   ├── components/                   # Navbar, Sidebar, SkillCard, Charts
│   ├── services/
│   │   ├── api.js                    # REST API Client for Spring Boot
│   │   └── firebase.js               # Firebase configuration
│   └── package.json
│
└── skillgapx-backend/                # Java Spring Boot REST API
    ├── pom.xml                       # Maven dependencies
    └── src/main/
        ├── java/com/skillgapx/
        │   ├── SkillGapXApplication.java  # Main application class
        │   ├── config/               # SecurityConfig, CorsConfig, JwtUtil
        │   ├── controller/           # 6 REST Controllers (9 endpoints)
        │   ├── dto/                  # Request & Response Data Transfer Objects
        │   ├── model/                # 6 JPA Entities (students, skills, etc.)
        │   ├── repository/           # Spring Data JPA Repositories
        │   └── service/              # Business Logic & AI Engines
        └── resources/
            ├── application.properties        # H2 default config (Port 8081)
            ├── application-mysql.properties   # MySQL production profile
            └── data.sql                      # Seed data (10 skills, 20 questions, 7 roles)
```

---

## 🎓 Academic Defense / MCA Viva Notes

1. **Why H2 In-Memory Database?**
   Allows evaluators to run the project immediately without configuring MySQL databases, creating schemas, or granting user permissions.
2. **How to Switch to MySQL?**
   Create a database `CREATE DATABASE skillgapxdb;` in MySQL, adjust credentials in `application-mysql.properties`, and run:
   `mvn spring-boot:run -Dspring-boot.run.profiles=mysql`
3. **CORS Security**:
   Configured in `CorsConfig.java` to explicitly whitelist `http://localhost:3000`.
4. **Stateless JWT Flow**:
   On `/api/auth/login`, passwords are checked against BCrypt hashes, and a signed HMAC-SHA512 JWT token is returned and stored in the frontend client.
