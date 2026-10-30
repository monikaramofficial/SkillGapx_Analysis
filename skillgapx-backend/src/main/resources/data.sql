-- ============================================================================
-- SkillGapX – Seed Data (data.sql)
-- Loaded automatically on Spring Boot startup via spring.sql.init.mode=always
-- ============================================================================

-- ======================== 1. DEMO STUDENT ========================
-- Password: password123 (BCrypt hash)
INSERT INTO students (full_name, email, password, degree, created_at)
VALUES ('Rahul Sharma', 'student@mca.edu',
        '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy',
        'MCA (Master of Computer Applications)', CURRENT_TIMESTAMP);

-- ======================== 2. SKILLS MASTER TABLE (10 Skills) ========================
INSERT INTO skills (skill_name, category, required_score, description) VALUES
('Java', 'Backend', 88, 'Core Java, OOP, Collections, Multithreading, Streams API'),
('Python', 'Backend', 75, 'Python Core, Loops, Functions, OOP, File Handling'),
('SQL', 'Database', 85, 'Relational Queries, JOINs, Subqueries, Indexing, Normalization'),
('HTML', 'Frontend', 80, 'Semantic HTML5, Forms, Accessibility, SEO Tags'),
('CSS', 'Frontend', 78, 'Flexbox, Grid, Responsive Design, Animations'),
('JavaScript', 'Frontend', 82, 'ES6+, DOM Manipulation, Async/Await, Closures'),
('React', 'Frontend', 80, 'Components, Hooks, State Management, Next.js Basics'),
('Spring Boot', 'Backend', 82, 'REST APIs, JPA, Security, Auto-configuration'),
('Git', 'Tools', 80, 'Branching, Merging, Rebasing, Pull Requests, GitHub'),
('Data Structures', 'Core CS', 85, 'Arrays, LinkedList, Trees, Graphs, Sorting, Searching');

-- ======================== 3. STUDENT-SKILL SCORES (Demo Student ID=1) ========================
INSERT INTO student_skills (student_id, skill_id, current_score, skill_level) VALUES
(1, 1, 78, 'Intermediate'),
(1, 2, 70, 'Intermediate'),
(1, 3, 82, 'Advanced'),
(1, 4, 90, 'Advanced'),
(1, 5, 85, 'Advanced'),
(1, 6, 76, 'Intermediate'),
(1, 7, 72, 'Intermediate'),
(1, 8, 65, 'Intermediate'),
(1, 9, 85, 'Advanced'),
(1, 10, 68, 'Intermediate');

-- ======================== 4. ASSESSMENT QUESTIONS (20 Questions) ========================
-- Java Questions (4)
INSERT INTO questions (category, question_text, option_a, option_b, option_c, option_d, correct_option, domain) VALUES
('Java Core & OOP', 'Which feature of Java facilitates runtime polymorphism and dynamic method dispatch?',
 'Method Overloading in the same class', 'Method Overriding with inheritance', 'Using the private access modifier', 'Declaring static utility methods', 1, 'Java');

INSERT INTO questions (category, question_text, option_a, option_b, option_c, option_d, correct_option, domain) VALUES
('Java Core & OOP', 'Which Java collection maintains insertion order and allows duplicate elements?',
 'HashSet', 'TreeMap', 'ArrayList', 'HashMap', 2, 'Java');

INSERT INTO questions (category, question_text, option_a, option_b, option_c, option_d, correct_option, domain) VALUES
('Java Core & OOP', 'What is the purpose of the final keyword when applied to a method in Java?',
 'Makes the method abstract', 'Prevents method overriding', 'Makes the method static', 'Allows multiple inheritance', 1, 'Java');

INSERT INTO questions (category, question_text, option_a, option_b, option_c, option_d, correct_option, domain) VALUES
('Java Core & OOP', 'Which interface must be implemented for Java objects to be compared using Collections.sort()?',
 'Serializable', 'Comparable', 'Cloneable', 'Iterable', 1, 'Java');

-- Spring Boot Questions (4)
INSERT INTO questions (category, question_text, option_a, option_b, option_c, option_d, correct_option, domain) VALUES
('Spring Boot Framework', 'In Spring Boot, which annotation is a combination of @Controller and @ResponseBody?',
 '@Component', '@Service', '@RestController', '@Configuration', 2, 'SpringBoot');

INSERT INTO questions (category, question_text, option_a, option_b, option_c, option_d, correct_option, domain) VALUES
('Spring Boot Framework', 'What does @Autowired do in Spring Boot?',
 'Creates a new bean instance', 'Injects a dependency automatically', 'Starts the application', 'Maps HTTP requests', 1, 'SpringBoot');

INSERT INTO questions (category, question_text, option_a, option_b, option_c, option_d, correct_option, domain) VALUES
('Spring Boot Framework', 'Which Spring Data JPA method naming convention automatically generates a query?',
 'executeQuery()', 'findByFieldName()', 'selectFromTable()', 'queryByColumn()', 1, 'SpringBoot');

INSERT INTO questions (category, question_text, option_a, option_b, option_c, option_d, correct_option, domain) VALUES
('Spring Boot Framework', 'Which file is the main configuration file in a Spring Boot project?',
 'web.xml', 'pom.xml', 'application.properties', 'settings.gradle', 2, 'SpringBoot');

-- SQL Questions (4)
INSERT INTO questions (category, question_text, option_a, option_b, option_c, option_d, correct_option, domain) VALUES
('Database & SQL', 'Which SQL clause is used to filter aggregated data generated by a GROUP BY statement?',
 'WHERE', 'HAVING', 'ORDER BY', 'LIMIT', 1, 'SQL');

INSERT INTO questions (category, question_text, option_a, option_b, option_c, option_d, correct_option, domain) VALUES
('Database & SQL', 'What is the difference between INNER JOIN and LEFT JOIN?',
 'No difference', 'LEFT JOIN includes all rows from left table', 'INNER JOIN includes all rows', 'LEFT JOIN only works with two tables', 1, 'SQL');

INSERT INTO questions (category, question_text, option_a, option_b, option_c, option_d, correct_option, domain) VALUES
('Database & SQL', 'Which normal form eliminates transitive dependencies?',
 'First Normal Form (1NF)', 'Second Normal Form (2NF)', 'Third Normal Form (3NF)', 'BCNF', 2, 'SQL');

INSERT INTO questions (category, question_text, option_a, option_b, option_c, option_d, correct_option, domain) VALUES
('Database & SQL', 'What does the ACID property Atomicity guarantee?',
 'Data is consistent', 'Transaction is all-or-nothing', 'Queries run in isolation', 'Data is durable on disk', 1, 'SQL');

-- DSA Questions (4)
INSERT INTO questions (category, question_text, option_a, option_b, option_c, option_d, correct_option, domain) VALUES
('Data Structures & Algorithms', 'What is the average time complexity for searching in a balanced Binary Search Tree?',
 'O(1)', 'O(n)', 'O(log n)', 'O(n log n)', 2, 'DSA');

INSERT INTO questions (category, question_text, option_a, option_b, option_c, option_d, correct_option, domain) VALUES
('Data Structures & Algorithms', 'Which data structure uses FIFO (First In First Out) principle?',
 'Stack', 'Queue', 'Binary Tree', 'Hash Map', 1, 'DSA');

INSERT INTO questions (category, question_text, option_a, option_b, option_c, option_d, correct_option, domain) VALUES
('Data Structures & Algorithms', 'What is the worst-case time complexity of QuickSort?',
 'O(n)', 'O(n log n)', 'O(n^2)', 'O(log n)', 2, 'DSA');

INSERT INTO questions (category, question_text, option_a, option_b, option_c, option_d, correct_option, domain) VALUES
('Data Structures & Algorithms', 'Which traversal visits the root node first, then left subtree, then right subtree?',
 'Inorder', 'Preorder', 'Postorder', 'Level Order', 1, 'DSA');

-- Git Questions (4)
INSERT INTO questions (category, question_text, option_a, option_b, option_c, option_d, correct_option, domain) VALUES
('Version Control & Git', 'Which Git command integrates changes by rewriting commit history linearly?',
 'git merge', 'git rebase', 'git checkout', 'git cherry-pick', 1, 'Git');

INSERT INTO questions (category, question_text, option_a, option_b, option_c, option_d, correct_option, domain) VALUES
('Version Control & Git', 'What does git stash do?',
 'Deletes untracked files', 'Temporarily saves uncommitted changes', 'Creates a new branch', 'Pushes to remote', 1, 'Git');

INSERT INTO questions (category, question_text, option_a, option_b, option_c, option_d, correct_option, domain) VALUES
('Version Control & Git', 'Which command shows the commit history in a concise one-line format?',
 'git status', 'git log --oneline', 'git diff', 'git show', 1, 'Git');

INSERT INTO questions (category, question_text, option_a, option_b, option_c, option_d, correct_option, domain) VALUES
('Version Control & Git', 'What is a pull request (PR) in GitHub?',
 'A command to pull code', 'A request to merge a branch into another', 'A way to delete a repository', 'A deployment command', 1, 'Git');

-- ======================== 5. CAREER ROLES (7 Roles) ========================
INSERT INTO career_roles (title, required_skills, hiring_demand, description) VALUES
('Full Stack Developer', 'Java,Spring Boot,React,SQL,Git,JavaScript', 'Very High', 'Build end-to-end web applications with Java backend and React frontend');

INSERT INTO career_roles (title, required_skills, hiring_demand, description) VALUES
('Java Developer', 'Java,Spring Boot,SQL,Git,Data Structures', 'High', 'Develop enterprise Java applications with Spring framework');

INSERT INTO career_roles (title, required_skills, hiring_demand, description) VALUES
('Python Developer', 'Python,SQL,Git,Data Structures,JavaScript', 'High', 'Build Python applications, automation scripts, and web services');

INSERT INTO career_roles (title, required_skills, hiring_demand, description) VALUES
('Data Analyst', 'SQL,Python,Data Structures,Git', 'Medium', 'Analyze business data using SQL and Python for insights and reporting');

INSERT INTO career_roles (title, required_skills, hiring_demand, description) VALUES
('Data Scientist', 'Python,SQL,Data Structures,Git', 'High', 'Build machine learning models and perform statistical analysis');

INSERT INTO career_roles (title, required_skills, hiring_demand, description) VALUES
('Machine Learning Engineer', 'Python,Data Structures,SQL,Git', 'High', 'Design and deploy ML models and data pipelines');

INSERT INTO career_roles (title, required_skills, hiring_demand, description) VALUES
('Cloud Engineer', 'Git,SQL,Java,Python', 'Very High', 'Design and manage cloud infrastructure on AWS/GCP/Azure');
