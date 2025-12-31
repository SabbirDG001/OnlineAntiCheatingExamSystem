# API Documentation

## Base URL
```
http://localhost:8080/api
```

## Authentication
All protected endpoints require JWT token in the Authorization header:
```
Authorization: Bearer {token}
```

---

## Authentication Endpoints

### 1. Teacher Login

**Endpoint:** `POST /auth/teacher/login`

**Description:** Authenticate a teacher and receive JWT token

**Request Body:**
```json
{
  "username": "teacher1",
  "password": "password123"
}
```

**Success Response (200):**
```json
{
  "token": "eyJhbGciOiJIUzUxMiJ9...",
  "userId": 1,
  "username": "teacher1",
  "userType": "TEACHER"
}
```

**Error Response (400):**
```json
{
  "error": "Invalid username or password"
}
```

---

### 2. Teacher Registration

**Endpoint:** `POST /auth/teacher/register`

**Description:** Register a new teacher account

**Request Body:**
```json
{
  "username": "teacher2",
  "password": "securepass123",
  "email": "teacher@example.com",
  "fullName": "John Doe"
}
```

**Success Response (200):**
```json
{
  "message": "Teacher registered successfully"
}
```

**Error Response (400):**
```json
{
  "error": "Username already exists"
}
```

---

### 3. Student Login

**Endpoint:** `POST /auth/student/login`

**Description:** Authenticate a student with exam code

**Query Parameters:**
- `examCode` (string, required): The unique 6-character exam code
- `studentId` (string, required): Student's unique ID
- `studentName` (string, required): Student's full name

**Example:**
```
POST /auth/student/login?examCode=ABC123&studentId=STU001&studentName=Alice%20Smith
```

**Success Response (200):**
```json
{
  "token": "eyJhbGciOiJIUzUxMiJ9...",
  "userId": 0,
  "username": "STU001",
  "userType": "STUDENT"
}
```

**Error Response (400):**
```json
{
  "error": "Invalid exam code"
}
```

---

## Exam Management Endpoints

### 4. Create Exam

**Endpoint:** `POST /exam/create`

**Description:** Create a new exam (Teacher only)

**Authentication:** Required

**Request Body:**
```json
{
  "examName": "Mathematics Final Exam",
  "duration": 120,
  "startTime": "2024-01-15T09:00:00",
  "endTime": "2024-01-15T11:00:00",
  "instructions": "Read all questions carefully. You have 2 hours to complete this exam."
}
```

**Success Response (200):**
```json
{
  "id": 1,
  "examName": "Mathematics Final Exam",
  "duration": 120,
  "startTime": "2024-01-15T09:00:00",
  "endTime": "2024-01-15T11:00:00",
  "examCode": "MTH456",
  "instructions": "Read all questions carefully...",
  "questions": [],
  "createdAt": "2024-01-10T12:00:00"
}
```

---

### 5. Get All Teacher Exams

**Endpoint:** `GET /exam/teacher/exams`

**Description:** Get all exams created by the logged-in teacher

**Authentication:** Required

**Success Response (200):**
```json
[
  {
    "id": 1,
    "examName": "Mathematics Final Exam",
    "duration": 120,
    "startTime": "2024-01-15T09:00:00",
    "endTime": "2024-01-15T11:00:00",
    "examCode": "MTH456",
    "instructions": "...",
    "questions": [],
    "createdAt": "2024-01-10T12:00:00"
  }
]
```

---

### 6. Get Exam by ID

**Endpoint:** `GET /exam/{examId}`

**Description:** Get detailed information about a specific exam

**Authentication:** Required

**Path Parameters:**
- `examId` (integer, required): The exam ID

**Example:** `GET /exam/1`

**Success Response (200):**
```json
{
  "id": 1,
  "examName": "Mathematics Final Exam",
  "duration": 120,
  "startTime": "2024-01-15T09:00:00",
  "endTime": "2024-01-15T11:00:00",
  "examCode": "MTH456",
  "instructions": "...",
  "questions": [
    {
      "id": 1,
      "questionText": "What is 2 + 2?",
      "marks": 1,
      "optionA": "3",
      "optionB": "4",
      "optionC": "5",
      "optionD": "6",
      "questionOrder": 1
    }
  ],
  "createdAt": "2024-01-10T12:00:00"
}
```

---

### 7. Get Exam by Code (Student)

**Endpoint:** `GET /exam/start`

**Description:** Get exam details using exam code (Student access)

**Query Parameters:**
- `examCode` (string, required): The unique exam code

**Example:** `GET /exam/start?examCode=MTH456`

**Success Response (200):**
```json
{
  "id": 1,
  "examName": "Mathematics Final Exam",
  "duration": 120,
  "startTime": "2024-01-15T09:00:00",
  "endTime": "2024-01-15T11:00:00",
  "examCode": "MTH456",
  "instructions": "...",
  "questions": [
    {
      "id": 1,
      "questionText": "What is 2 + 2?",
      "marks": 1,
      "optionA": "3",
      "optionB": "4",
      "optionC": "5",
      "optionD": "6",
      "questionOrder": 1
    }
  ],
  "createdAt": "2024-01-10T12:00:00"
}
```

**Note:** `correctAnswer` is NOT included for student access

---

### 8. Add Question to Exam

**Endpoint:** `POST /exam/{examId}/add-question`

**Description:** Add a multiple-choice question to an exam

**Authentication:** Required (Teacher)

**Path Parameters:**
- `examId` (integer, required): The exam ID

**Request Body:**
```json
{
  "questionText": "What is the capital of France?",
  "marks": 2,
  "optionA": "London",
  "optionB": "Paris",
  "optionC": "Berlin",
  "optionD": "Madrid",
  "correctAnswer": "B",
  "questionOrder": 1
}
```

**Success Response (200):**
```json
{
  "message": "Question added successfully"
}
```

---

### 9. Get Randomized Questions

**Endpoint:** `GET /exam/{examId}/questions`

**Description:** Get all questions for an exam in randomized order

**Path Parameters:**
- `examId` (integer, required): The exam ID

**Example:** `GET /exam/1/questions`

**Success Response (200):**
```json
[
  {
    "id": 1,
    "questionText": "What is 2 + 2?",
    "marks": 1,
    "optionA": "3",
    "optionB": "4",
    "optionC": "5",
    "optionD": "6",
    "questionOrder": 1
  },
  {
    "id": 3,
    "questionText": "What is the capital of France?",
    "marks": 2,
    "optionA": "London",
    "optionB": "Paris",
    "optionC": "Berlin",
    "optionD": "Madrid",
    "questionOrder": 2
  }
]
```

**Note:** Questions are returned in randomized order; `correctAnswer` is NOT included

---

### 10. Check Student Exists

**Endpoint:** `GET /exam/{examId}/check-student/{studentId}`

**Description:** Check if a student has already submitted the exam

**Path Parameters:**
- `examId` (integer, required): The exam ID
- `studentId` (string, required): The student ID

**Example:** `GET /exam/1/check-student/STU001`

**Success Response (200):**
```json
false  // or true if student already submitted
```

---

### 11. Submit Exam

**Endpoint:** `POST /exam/submit`

**Description:** Submit completed exam with answers

**Request Body:**
```json
{
  "examId": 1,
  "studentId": "STU001",
  "studentName": "Alice Smith",
  "answers": [
    {
      "questionId": 1,
      "answer": "B",
      "warningCount": 1
    },
    {
      "questionId": 2,
      "answer": "UNANSWERED",
      "warningCount": 1
    },
    {
      "questionId": 3,
      "answer": "A",
      "warningCount": 1
    }
  ],
  "warningCount": 1
}
```

**Success Response (200):**
```json
{
  "message": "Exam submitted successfully. Score: 5"
}
```

**Error Response (400):**
```json
{
  "error": "Student has already submitted exam"
}
```

---

### 12. Get Exam Results

**Endpoint:** `GET /exam/{examId}/results`

**Description:** Get all results for an exam (sorted by student ID)

**Authentication:** Required (Teacher)

**Path Parameters:**
- `examId` (integer, required): The exam ID

**Example:** `GET /exam/1/results`

**Success Response (200):**
```json
[
  {
    "id": 1,
    "studentId": "STU001",
    "studentName": "Alice Smith",
    "marksObtained": 8.0,
    "warningCount": 1,
    "examCompleted": true,
    "submittedAt": "2024-01-15 10:30:00"
  },
  {
    "id": 2,
    "studentId": "STU002",
    "studentName": "Bob Johnson",
    "marksObtained": 5.5,
    "warningCount": 3,
    "examCompleted": true,
    "submittedAt": "2024-01-15 10:45:00"
  }
]
```

---

## HTTP Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK - Request successful |
| 400 | Bad Request - Invalid input or logic error |
| 401 | Unauthorized - Missing or invalid token |
| 404 | Not Found - Resource not found |
| 500 | Internal Server Error |

---

## Error Handling

All error responses follow this format:

```json
{
  "error": "Error description message"
}
```

---

## Response Examples

### Exam DTO Structure
```json
{
  "id": 1,
  "examName": "String",
  "duration": "Integer (minutes)",
  "startTime": "ISO DateTime",
  "endTime": "ISO DateTime",
  "examCode": "String (6 chars)",
  "instructions": "String",
  "questions": "Array of QuestionDTO",
  "createdAt": "ISO DateTime"
}
```

### Question DTO Structure
```json
{
  "id": 1,
  "questionText": "String",
  "marks": "Integer",
  "optionA": "String",
  "optionB": "String",
  "optionC": "String",
  "optionD": "String",
  "questionOrder": "Integer"
}
```

### Result DTO Structure
```json
{
  "id": 1,
  "studentId": "String",
  "studentName": "String",
  "marksObtained": "Double",
  "warningCount": "Integer",
  "examCompleted": "Boolean",
  "submittedAt": "String (DateTime)"
}
```

---

## Example API Calls

### Using cURL

**Teacher Login:**
```bash
curl -X POST http://localhost:8080/api/auth/teacher/login \
  -H "Content-Type: application/json" \
  -d '{"username":"teacher1","password":"password123"}'
```

**Create Exam:**
```bash
curl -X POST http://localhost:8080/api/exam/create \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"examName":"Test Exam","duration":60,"startTime":"2024-01-15T09:00:00","endTime":"2024-01-15T10:00:00"}'
```

**Get Exam by Code:**
```bash
curl -X GET "http://localhost:8080/api/exam/start?examCode=MTH456"
```

**Submit Exam:**
```bash
curl -X POST http://localhost:8080/api/exam/submit \
  -H "Content-Type: application/json" \
  -d '{
    "examId":1,
    "studentId":"STU001",
    "studentName":"Alice",
    "answers":[{"questionId":1,"answer":"B","warningCount":0}],
    "warningCount":0
  }'
```

---

## Rate Limiting

Currently, there is no rate limiting implemented. This should be added in production.

## CORS

CORS is configured to allow requests from:
- http://localhost:3000
- http://localhost:3001

Update `application.properties` for production domains.
