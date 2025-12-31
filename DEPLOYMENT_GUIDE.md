# Deployment Guide

This guide will walk you through deploying the Online Exam Anti-Cheat System.

## Part 1: Setting up the PostgreSQL Database with Supabase

We will use Supabase to get a free PostgreSQL database.

### Step 1: Create a Supabase Account and Project

1.  Go to [supabase.com](https://supabase.com) and create a free account.
2.  Once you are logged in, create a new project.
    *   Choose a name for your project.
    *   Make sure to save the **Database Password** you provide; you will need it later.
    *   Choose a region that is close to you.
    *   Click "Create new project".

### Step 2: Get Your Database Connection Information

1.  After your project is created, navigate to the **Project Settings**.
2.  In the sidebar, click on **Database**.
3.  Under **Connection info**, you will find the following:
    *   **Host**: `db.<your-project-ref>.supabase.co`
    *   **Database name**: `postgres`
    *   **Port**: `5432`
    *   **User**: `postgres`
    *   **Password**: The password you saved when creating the project.

### Step 3: Configure Your Backend

1.  In the `OnlineExamAntiCheatSystem/backend` directory, create a new file named `.env`.
2.  Copy the content of `.env.example` and paste it into the new `.env` file.
3.  Update the `.env` file with your Supabase database credentials:

    ```
    SPRING_DATASOURCE_URL=jdbc:postgresql://<DB_HOST>:5432/postgres?sslmode=require
    SPRING_DATASOURCE_USERNAME=postgres
    SPRING_DATASOURCE_PASSWORD=<your-supabase-password>
    SPRING_JPA_DDL=update
    SPRING_HIBERNATE_DIALECT=org.hibernate.dialect.PostgreSQLDialect

    # It is highly recommended to change the default JWT secret
    JWT_SECRET=YourVerySecureRandomJWTSecret

    # This will be the URL of your deployed frontend (we will set this up later)
    CORS_ALLOWED_ORIGINS=http://localhost:3000
    ```

    *   Replace `<DB_HOST>` with the **Host** from your Supabase project.
    *   Replace `<your-supabase-password>` with the **Database Password** you saved.

### Step 4: Run the Backend with Supabase

Now that your backend is configured to use Supabase, you can run it locally to test the connection.

1.  Open a terminal in the `OnlineExamAntiCheatSystem/backend` directory.
2.  Run the command: `mvn spring-boot:run`

The backend should now start up and connect to your Supabase database. The first time it runs, it will create all the necessary tables in your database because of the `SPRING_JPA_DDL=update` setting.

---

## Part 2: Hosting the Application

We will host the backend on **Render** and the frontend on **Vercel**. Both have generous free tiers.

### Step 5: Prepare Your Code for Deployment

1.  **Fork the Repository**: If you are working from a cloned repository, it's best to fork it to your own GitHub account. This will allow Render and Vercel to access your code.
2.  **Push Your Changes**: Make sure you have committed and pushed all your changes to your GitHub repository, including the `DEPLOYMENT_GUIDE.md` if you have made changes to it.

### Step 6: Deploy the Backend to Render

1.  Go to [render.com](https://render.com) and create an account.
2.  On your dashboard, click **New +** and select **Web Service**.
3.  Connect your GitHub account and select your forked repository.
4.  Configure the web service:
    *   **Name**: Give your service a name (e.g., `exam-backend`).
    *   **Region**: Choose a region close to your Supabase database.
    *   **Branch**: Select your main branch.
    *   **Root Directory**: `backend`
    *   **Runtime**: `Java`
    *   **Build Command**: `mvn clean install`
    *   **Start Command**: `java -jar target/OnlineExamAntiCheatSystem-1.0.0.jar`
    *   **Instance Type**: `Free`
5.  Click on **Advanced Settings**.
6.  Add the following **Environment Variables**:
    *   `SPRING_DATASOURCE_URL`: `jdbc:postgresql://<DB_HOST>:5432/postgres?sslmode=require` (replace `<DB_HOST>` with your Supabase host)
    *   `SPRING_DATASOURCE_USERNAME`: `postgres`
    *   `SPRING_DATASOURCE_PASSWORD`: `<your-supabase-password>`
    *   `SPRING_JPA_DDL`: `update`
    *   `SPRING_HIBERNATE_DIALECT`: `org.hibernate.dialect.PostgreSQLDialect`
    *   `JWT_SECRET`: A very secure random string of your choice.
    *   `CORS_ALLOWED_ORIGINS`: We will fill this in after deploying the frontend. For now, you can use `http://localhost:3000`.
7.  Click **Create Web Service**. Render will now build and deploy your backend. This might take a few minutes.
8.  Once the deployment is complete, copy the URL of your backend service (e.g., `https://exam-backend.onrender.com`).

### Step 7: Deploy the Frontend to Vercel

1.  Go to [vercel.com](https://vercel.com) and create an account.
2.  On your dashboard, click **Add New...** and select **Project**.
3.  Connect your GitHub account and select your forked repository.
4.  Configure the project:
    *   **Framework Preset**: `Create React App`
    *   **Root Directory**: `frontend`
5.  Expand the **Environment Variables** section and add the following:
    *   `REACT_APP_API_BASE_URL`: The URL of your deployed backend service from Render (e.g., `https://exam-backend.onrender.com/api`). Make sure to include the `/api` at the end.
6.  Click **Deploy**. Vercel will now build and deploy your frontend.
7.  Once the deployment is complete, copy the URL of your frontend (e.g., `https://exam-frontend.vercel.app`).

### Step 8: Final Configuration

1.  Go back to your backend service on Render.
2.  Navigate to the **Environment** tab.
3.  Update the `CORS_ALLOWED_ORIGINS` environment variable with the URL of your deployed frontend.
    *   `CORS_ALLOWED_ORIGINS`: `https://exam-frontend.vercel.app` (replace with your Vercel URL)
4.  Save the changes. Render will automatically restart your backend with the new environment variable.

Congratulations! Your Online Exam Anti-Cheat System should now be live and accessible online.