# Installation & Setup Guide

## Prerequisites

### System Requirements
- **OS**: Windows, macOS, or Linux
- **Java**: JDK 17 or higher
- **Node.js**: v16 or higher
- **MySQL**: v8.0 or higher
- **Maven**: v3.8.1 or higher (optional, can use wrapper)

### Installation

#### 1. Install Java
- Download from: https://www.oracle.com/java/technologies/downloads/#java17
- Or use OpenJDK: https://adoptium.net/

#### 2. Install MySQL
- Download from: https://dev.mysql.com/downloads/mysql/
- Installation guide: https://dev.mysql.com/doc/refman/8.0/en/installing.html

#### 3. Install Node.js
- Download from: https://nodejs.org/
- Choose LTS version

#### 4. Install Maven (Optional)
- Download from: https://maven.apache.org/download.cgi
- Installation guide: https://maven.apache.org/install.html

---

## Step-by-Step Setup

### Step 1: Create Database

1. Open MySQL Command Line or MySQL Workbench
2. Run the following SQL command:

```sql
CREATE DATABASE exam_antiCheat_db;
```

3. Verify the database was created:

```sql
SHOW DATABASES;
```

---

### Step 2: Configure Backend

1. Navigate to backend directory:
```bash
cd backend
```

2. Edit configuration file: `src/main/resources/application.properties`

Update these values with your MySQL credentials:
```properties
spring.datasource.username=root
spring.datasource.password=your_mysql_password
```

3. (Optional) Change JWT secret key:
```properties
app.jwtSecret=your_super_secret_key_here_minimum_32_characters
```

---

### Step 3: Build Backend

#### Option A: Using Maven (if installed)
```bash
cd backend
mvn clean install
```

#### Option B: Using Maven Wrapper (included)
```bash
cd backend
./mvnw clean install          # macOS/Linux
mvnw.cmd clean install         # Windows
```

Expected output:
```
[INFO] BUILD SUCCESS
```

---

### Step 4: Run Backend

#### Option A: Using Maven
```bash
cd backend
mvn spring-boot:run
```

#### Option B: Using Maven Wrapper
```bash
cd backend
./mvnw spring-boot:run        # macOS/Linux
mvnw.cmd spring-boot:run       # Windows
```

#### Option C: Using JAR file
```bash
cd backend
java -jar target/OnlineExamAntiCheatSystem-1.0.0.jar
```

**Expected output:**
```
Started OnlineExamAntiCheatSystemApplication in X.XXX seconds
```

Backend is now running on: **http://localhost:8080**

---

### Step 5: Setup Frontend

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install Node dependencies:
```bash
npm install
```

This may take a few minutes. You should see:
```
added XXX packages, and audited XXX packages in XXXs
```

---

### Step 6: Run Frontend

1. Start the React development server:
```bash
npm start
```

2. Your browser should automatically open to: **http://localhost:3000**

If not, manually navigate to it.

**Expected output:**
```
webpack compiled successfully
```

Frontend is now running on: **http://localhost:3000**

---

## Verification

### Test Backend API

Open a terminal and run:

```bash
curl http://localhost:8080/api/auth/teacher/login \
  -H "Content-Type: application/json" \
  -d '{"username":"test","password":"test"}'
```

You should get an error response (expected, as no user exists yet):
```json
{"error": "..."}
```

### Test Frontend

1. Open http://localhost:3000 in your browser
2. You should see the home page with Teacher and Student panels
3. Try clicking "Teacher Register" to verify routing works

---

## Initial Setup: Create Test Data

### 1. Register a Teacher

1. Go to http://localhost:3000
2. Click "Register" under Teacher Panel
3. Fill in the form:
   - Username: `teacher1`
   - Full Name: `John Doe`
   - Email: `teacher@example.com`
   - Password: `password123`
4. Click "Register"
5. You should see a success message

### 2. Login as Teacher

1. Click "Login" link or navigate to `/teacher-login`
2. Enter credentials:
   - Username: `teacher1`
   - Password: `password123`
3. You should be redirected to the dashboard

### 3. Create a Test Exam

1. Click "Create New Exam"
2. Fill in the form:
   - Exam Name: `Sample Math Test`
   - Duration: `30` minutes
   - Start Time: Today at 10:00 AM
   - End Time: Today at 10:30 AM
   - Instructions: `Answer all questions to the best of your ability`
3. Click "Create Exam"
4. You'll be redirected to the exam edit page

### 4. Add Test Questions

1. On the exam edit page, fill in the "Add New Question" form:
   - Question: `What is 2 + 2?`
   - Marks: `1`
   - Options: A) 3, B) 4, C) 5, D) 6
   - Correct Answer: B
2. Click "Add Question"
3. Repeat for more questions

### 5. Note the Exam Code

The exam code is displayed in the header. Example: `ABC123`

### 6. Test as Student

1. Open a new browser tab/window
2. Go to http://localhost:3000
3. Click "Start Exam" under Student Panel
4. Enter:
   - Exam Code: The code from step 5
   - Student ID: `STU001`
   - Student Name: `Alice Smith`
5. Click "Start Exam"
6. Read the instructions and agree to terms
7. Click "Start Exam (Full Screen)"
8. Answer the questions
9. Click "Submit Exam"

### 7. View Results

1. Switch back to teacher tab
2. Click "Back to Dashboard"
3. Click "View Results" on the exam card
4. You should see the student results

---

## Troubleshooting

### Backend Issues

**Problem: Port 8080 already in use**
- Change port in `application.properties`:
  ```properties
  server.port=8081
  ```
- Restart backend

**Problem: MySQL connection error**
- Ensure MySQL is running
- Verify credentials in `application.properties`
- Check MySQL is listening on port 3306

**Problem: Database not found error**
- Create the database using the SQL command above
- Restart backend

### Frontend Issues

**Problem: Port 3000 already in use**
- Kill the process: `npx kill-port 3000`
- Or specify a different port: `PORT=3001 npm start`

**Problem: Modules not found**
- Delete `node_modules` folder
- Delete `package-lock.json`
- Run `npm install` again

**Problem: API connection error**
- Ensure backend is running on port 8080
- Check browser console (F12) for actual error
- Update API URL in `frontend/src/services/api.js` if needed

### General Issues

**Problem: Can't reach localhost:3000**
- Ensure frontend development server is running
- Check firewall settings
- Try http://127.0.0.1:3000

**Problem: Browser security warnings**
- Some features (fullscreen, etc.) require HTTPS in production
- For development, this is normal

---

## Project Structure After Setup

```
OnlineExamAntiCheatSystem/
├── backend/
│   ├── src/
│   ├── target/                    # Generated build files
│   ├── pom.xml
│   └── mvnw                       # Maven wrapper script
├── frontend/
│   ├── src/
│   ├── public/
│   ├── node_modules/              # Installed npm packages
│   ├── package.json
│   └── package-lock.json
├── README.md
├── API_DOCUMENTATION.md
└── .gitignore
```

---

## Production Deployment

### For Production Build

**Backend:**
```bash
cd backend
mvn clean package
java -jar target/OnlineExamAntiCheatSystem-1.0.0.jar
```

**Frontend:**
```bash
cd frontend
npm run build
# Deploy the 'build' folder to your web server
```

---

## Additional Commands

### Backend

```bash
# Clean build artifacts
mvn clean

# Skip tests during build
mvn clean install -DskipTests

# Run specific test
mvn test -Dtest=TestClass
```

### Frontend

```bash
# Run linter
npm run lint

# Build for production
npm run build

# Run tests
npm test

# Eject configuration (WARNING: Irreversible)
npm run eject
```

---

## Support

If you encounter issues:

1. Check the console logs for error messages
2. Ensure all prerequisites are installed
3. Verify MySQL and both servers are running
4. Check API documentation for endpoint details
5. Review README.md for feature descriptions

---

## Next Steps

1. Explore the teacher dashboard
2. Create multiple exams with various questions
3. Test the student interface with anti-cheat features
4. Review results and warning system
5. Customize styles and features as needed
