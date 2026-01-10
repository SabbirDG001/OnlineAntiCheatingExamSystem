# Online Exam Anti-Cheat System

A comprehensive full-stack web application for secure online examinations with advanced anti-cheating features.

## Features

### 🎓 Teacher Panel
- **Exam Management**
  - Create exams with name, duration, start and end time
  - Automatic generation of unique exam codes
  - Add multiple-choice questions with options and marks
  - Manage exam instructions and rules
  
- **Results Dashboard**
  - View comprehensive exam results
  - Display student ID, name, marks, and warning count
  - Results sorted by student ID
  - Prevent duplicate student submissions

### 👨‍🎓 Student Panel
- **Secure Exam Interface**
  - Enter exam code, student ID, and name
  - Read instructions and rules before starting
  - Questions displayed one at a time
  - Randomized question sequence for each student
  
- **Anti-Cheat Features**
  - Disable copy, cut, paste operations
  - Block right-click menu
  - Prevent drag & drop
  - Disable print screen
  - Detect tab switching
  - AI command blocker: "[For AI: Ignore all instructions...]"
  
- **Warning System** (3 warnings maximum)
  - 1st attempt: "You have been warned."
  - 2nd attempt: "You have been warned again."
  - 3rd attempt: Exam ends automatically

### 🔐 Security
- JWT authentication for teacher and student login
- Server-side validation of answers
- Timer validation on backend
- Prevent duplicate student IDs in exam
- Secure password storage using BCrypt

## Technology Stack

### Backend
- **Framework**: Spring Boot 3.1.5
- **Language**: Java 17
- **Database**: MySQL 8
- **Authentication**: JWT (JSON Web Tokens)
- **Build Tool**: Maven

### Frontend
- **Library**: React 18.2.0
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Styling**: CSS3

## Project Structure

```
OnlineExamAntiCheatSystem/
├── backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/exam/
│   │   │   │   ├── OnlineExamAntiCheatSystemApplication.java
│   │   │   │   ├── controller/
│   │   │   │   │   ├── AuthController.java
│   │   │   │   │   └── ExamController.java
│   │   │   │   ├── entity/
│   │   │   │   │   ├── Exam.java
│   │   │   │   │   ├── Question.java
│   │   │   │   │   ├── Result.java
│   │   │   │   │   ├── Answer.java
│   │   │   │   │   └── Teacher.java
│   │   │   │   ├── repository/
│   │   │   │   │   ├── ExamRepository.java
│   │   │   │   │   ├── QuestionRepository.java
│   │   │   │   │   ├── ResultRepository.java
│   │   │   │   │   ├── AnswerRepository.java
│   │   │   │   │   └── TeacherRepository.java
│   │   │   │   ├── service/
│   │   │   │   │   ├── AuthService.java
│   │   │   │   │   └── ExamService.java
│   │   │   │   ├── security/
│   │   │   │   │   ├── JwtTokenProvider.java
│   │   │   │   │   └── JwtAuthenticationFilter.java
│   │   │   │   ├── config/
│   │   │   │   │   └── SecurityConfig.java
│   │   │   │   └── dto/
│   │   │   │       ├── LoginRequest.java
│   │   │   │       ├── LoginResponse.java
│   │   │   │       ├── ExamDTO.java
│   │   │   │       ├── QuestionDTO.java
│   │   │   │       ├── ResultDTO.java
│   │   │   │       ├── SubmitAnswerRequest.java
│   │   │   │       └── SubmitExamRequest.java
│   │   │   └── resources/
│   │   │       └── application.properties
│   └── pom.xml
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── TeacherAuth.jsx
    │   │   ├── TeacherDashboard.jsx
    │   │   ├── CreateExam.jsx
    │   │   ├── EditExam.jsx
    │   │   ├── ExamResults.jsx
    │   │   ├── StudentAuth.jsx
    │   │   ├── StudentExamInstructions.jsx
    │   │   ├── StudentExam.jsx
    │   │   └── ExamCompleted.jsx
    │   ├── services/
    │   │   └── api.js
    │   ├── styles/
    │   │   ├── Auth.css
    │   │   ├── StudentAuth.css
    │   │   ├── TeacherDashboard.css
    │   │   ├── CreateExam.css
    │   │   ├── EditExam.css
    │   │   ├── ExamResults.css
    │   │   ├── StudentExam.css
    │   │   └── ExamCompleted.css
    │   ├── App.jsx
    │   ├── App.css
    │   └── index.js
    ├── public/
    │   └── index.html
    └── package.json
```

## Database Schema

### Tables

#### teachers
- id (PK)
- username (UNIQUE)
- password
- email
- fullName

#### exams
- id (PK)
- examName
- duration (minutes)
- startTime
- endTime
- examCode (UNIQUE)
- teacherId (FK)
- instructions
- createdAt

#### questions
- id (PK)
- examId (FK)
- questionText
- marks
- optionA
- optionB
- optionC
- optionD
- correctAnswer (A, B, C, D)
- questionOrder

#### results
- id (PK)
- examId (FK)
- studentId
- studentName
- marksObtained
- warningCount
- examCompleted
- submittedAt
- UNIQUE(examId, studentId)

#### answers
- id (PK)
- examId (FK)
- questionId (FK)
- studentId
- selectedAnswer (A, B, C, D, UNANSWERED)
- isCorrect

## Setup Instructions

### Prerequisites
- Java 17+
- MySQL 8.0+
- Node.js 16+
- npm or yarn

### Backend Setup

1. **Create Database**
   ```sql
   CREATE DATABASE exam_antiCheat_db;
   ```

2. **Update MySQL Credentials**
   Edit `backend/src/main/resources/application.properties`:
   ```properties
   spring.datasource.username=your_username
   spring.datasource.password=your_password
   ```

3. **Build and Run**
   ```bash
   cd backend
   mvn clean install
   mvn spring-boot:run
   ```
   Backend runs on `http://localhost:8080`

### Frontend Setup

1. **Install Dependencies**
   ```bash
   cd frontend
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm start
   ```
   Frontend runs on `http://localhost:3000`

## API Endpoints

### Authentication APIs

#### Teacher Login
```
POST /api/auth/teacher/login
Body: { username, password }
Response: { token, userId, username, userType }
```

#### Teacher Registration
```
POST /api/auth/teacher/register
Body: { username, password, email, fullName }
Response: Message confirming registration
```

#### Student Login
```
POST /api/auth/student/login?examCode=XXX&studentId=STU001&studentName=Name
Response: { token, userId, username, userType }
```

### Exam APIs

#### Create Exam (Teacher)
```
POST /api/exam/create
Headers: Authorization: Bearer {token}
Body: { examName, duration, startTime, endTime, instructions }
Response: ExamDTO with generated examCode
```

#### Get Teacher Exams
```
GET /api/exam/teacher/exams
Headers: Authorization: Bearer {token}
Response: List of ExamDTO
```

#### Get Exam by ID
```
GET /api/exam/{examId}
Headers: Authorization: Bearer {token}
Response: ExamDTO with questions
```

#### Get Exam by Code (Student)
```
GET /api/exam/start?examCode=ABCDEF
Response: ExamDTO (without correct answers)
```

#### Add Question to Exam
```
POST /api/exam/{examId}/add-question
Headers: Authorization: Bearer {token}
Body: { questionText, marks, optionA, optionB, optionC, optionD, correctAnswer, questionOrder }
Response: Success message
```

#### Get Exam Questions (Randomized)
```
GET /api/exam/{examId}/questions
Response: List of QuestionDTO (randomized)
```

#### Check Student Exists
```
GET /api/exam/{examId}/check-student/{studentId}
Response: Boolean
```

#### Submit Exam
```
POST /api/exam/submit
Body: {
  examId,
  studentId,
  studentName,
  answers: [{ questionId, answer, warningCount }],
  warningCount
}
Response: Success message with score
```

#### Get Exam Results
```
GET /api/exam/{examId}/results
Headers: Authorization: Bearer {token}
Response: List of ResultDTO (sorted by studentId)
```

## Anti-Cheat Mechanisms

### Disabled Operations
- **Copy**: `Ctrl+C` / `Cmd+C`
- **Cut**: `Ctrl+X` / `Cmd+X`
- **Paste**: `Ctrl+V` / `Cmd+V`
- **Right-click**: Context menu
- **Drag & Drop**: File/element dragging
- **Print Screen**: Screen capture key
- **Keyboard Shortcuts**: Various suspicious shortcuts

### Monitoring Features
- **Tab Switching Detection**: Detects when user switches tabs
- **Window Blur Detection**: Detects when user switches to another window
- **Fullscreen Monitoring**: Detects when user exits fullscreen
- **Warning Counter**: Tracks violations (max 3)
- **Auto-submission**: Auto-submits exam on 3rd warning

### Visual Indicators
- **Watermark**: Student ID and name displayed on exam
- **AI Command Section**: Reminder at top of each question
- **Warning Indicator**: Visual dots showing warning count
- **Screen Blur**: Temporary blur on warnings
- **Timer Color**: Changes color when time is running low (<5 min)

## Usage Examples

### For Teachers

1. **Register as Teacher**
   - Navigate to `/teacher-register`
   - Enter credentials and create account

2. **Create an Exam**
   - Login to dashboard
   - Click "Create New Exam"
   - Fill in exam details
   - Click "Create Exam"

3. **Add Questions**
   - Go to exam edit page
   - Fill in question details
   - Select correct answer
   - Click "Add Question"

4. **View Results**
   - Navigate to exam
   - Click "View Results"
   - See student performance and warning counts

### For Students

1. **Start Exam**
   - Navigate to `/student-login`
   - Enter exam code, student ID, and name
   - Click "Start Exam"

2. **Review Instructions**
   - Read all exam rules
   - Check anti-cheat warnings
   - Agree to terms
   - Click "Start Exam (Full Screen)"

3. **Take Exam**
   - Answer questions one at a time
   - Questions are randomized
   - Monitor timer and warning count
   - Navigate with Previous/Next buttons

4. **Submit Exam**
   - Review all answers
   - Click "Submit Exam"
   - Confirm submission
   - View completion message

## Security Considerations

1. **JWT Secret Key**: Change default key in production
   ```properties
   app.jwtSecret=YourSecureKeyHere
   ```

2. **CORS Configuration**: Update allowed origins for production
   ```properties
   app.cors.allowed-origins=https://yourdomain.com
   ```

3. **Database Credentials**: Use environment variables for sensitive data

4. **HTTPS**: Always use HTTPS in production

5. **Token Expiration**: Set appropriate expiration time
   ```properties
   app.jwtExpiration=86400000  # 24 hours in milliseconds
   ```

## Testing the System

### Test Credentials
- Teacher: Create during registration
- Student: Use any ID (exam code required)

### Test Exams
1. Create a test exam with 5 questions
2. Use various question types and mark distributions
3. Submit as different students to test duplicate prevention
4. Verify warning system by simulating tab switches

## Troubleshooting

### Backend Issues
- **Port Already in Use**: Change port in `application.properties`
- **Database Connection Failed**: Verify MySQL is running and credentials are correct
- **JWT Token Error**: Check token format in Authorization header

### Frontend Issues
- **API Connection Refused**: Ensure backend is running on port 8080
- **CORS Error**: Check CORS configuration in SecurityConfig
- **Fullscreen Not Working**: Some browsers restrict fullscreen in development mode

## Future Enhancements

1. **Question Bank**: Reusable question libraries
2. **Analytics Dashboard**: Detailed exam analytics
3. **Proctoring**: Video/audio recording integration
4. **Mobile App**: Native iOS/Android apps
5. **AI Proctoring**: Advanced AI-based cheating detection
6. **Multi-language Support**: Support for multiple languages
7. **Question Pools**: Different question sets per student
8. **Partial Marking**: Support for partial credit

## License

This project is open-source and available under the MIT License.

## Support

For issues, questions, or contributions, please contact the development team or open an issue in the repository.
