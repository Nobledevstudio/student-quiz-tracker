# QuizTrack

A full-stack student quiz tracking application built for creating, taking, and tracking quiz results.

## Overview

QuizTrack allows users to:

* Create quizzes with multiple-choice questions
* View available quizzes
* Take quizzes and submit answers
* Receive an automatically calculated score
* View previous attempts and results
* Track quiz and attempt statistics from the dashboard

The application uses a React frontend, Express API, and PostgreSQL database with Prisma ORM.

## Features

### Quiz Management

* Create quizzes with a title and multiple questions
* Each question contains four answer options
* Select the correct answer when creating a question
* View all available quizzes
* View question and attempt counts

### Quiz Taking

* Navigate through quiz questions
* Select an answer for each question
* Submit the completed quiz
* Server-side score calculation
* Display score, percentage, and total questions

### Results

* View the result immediately after submission
* Store every quiz attempt in PostgreSQL
* View historical attempts for each quiz
* Display score, percentage, and submission date

### Dashboard

* Total quizzes
* Total quiz attempts
* Average performance
* Monthly quiz activity
* Monthly attempt statistics

## Tech Stack

### Frontend

* React
* TypeScript
* Vite
* Tailwind CSS
* React Router
* TanStack Query
* Axios
* Lucide React
* Sonner

### Backend

* Node.js
* Express
* TypeScript
* Zod
* Prisma ORM

### Database

* PostgreSQL
* Neon PostgreSQL

### Deployment

* Frontend: Vercel
* Backend: Render
* Database: Neon

## Project Structure

```text
student-quiz-tracker/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/
│   │   │   ├── layout/
│   │   │   └── ui/
│   │   │
│   │   ├── features/
│   │   │   ├── dashboard/
│   │   │   └── quizzess/
│   │   │
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── lib/
│   │   └── index.css
│   │
│   └── package.json
│
├── server/
│   ├── src/
│   │   ├── config/
│   │   ├── middlewares/
│   │   ├── modules/
│   │   ├── validators/
│   │   └── server.ts
│   │
│   ├── prisma/
│   │   └── schema.prisma
│   │
│   └── package.json
│
└── README.md
```

## Database Design

The application uses three main models:

### Quiz

Stores quiz information.

* `id`
* `title`
* `createdAt`
* `updatedAt`

### Question

Stores individual questions belonging to a quiz.

* `id`
* `quizId`
* `text`
* `options`
* `correctAnswer`
* `createdAt`

### QuizResult

Stores every submitted attempt.

* `id`
* `quizId`
* `score`
* `total`
* `createdAt`

### Relationship

```text
Quiz
 │
 ├── Questions
 │     ├── Question
 │     ├── Question
 │     └── Question
 │
 └── Results
       ├── QuizResult
       ├── QuizResult
       └── QuizResult
```

Deleting a quiz also removes its related questions and results through cascading relations.

## API

Base URL:

```text
/api
```

### Create Quiz

```http
POST /api/quizzes
```

Example request:

```json
{
  "title": "React Fundamentals",
  "questions": [
    {
      "text": "Which library is used for building user interfaces?",
      "options": [
        "React",
        "Express",
        "Prisma",
        "PostgreSQL"
      ],
      "correctAnswer": "React"
    }
  ]
}
```

### Get All Quizzes

```http
GET /api/quizzes
```

Returns all quizzes with question and attempt counts.

### Get Quiz

```http
GET /api/quizzes/:id
```

Returns the quiz and its questions.

Correct answers are intentionally excluded from this endpoint.

### Submit Quiz

```http
POST /api/quizzes/:id/submit
```

Example request:

```json
{
  "answers": [
    {
      "questionId": "question-id",
      "answer": "React"
    }
  ]
}
```

Example response:

```json
{
  "success": true,
  "message": "Quiz submitted successfully",
  "data": {
    "score": 3,
    "total": 5,
    "percentage": 60,
    "submittedAt": "2026-09-25T12:00:00.000Z"
  }
}
```

### Get Quiz Results

```http
GET /api/quizzes/:id/results
```

Returns the previous attempts for a quiz.

### Dashboard Statistics

```http
GET /api/dashboard/stats
```

Returns aggregate quiz and attempt statistics.

## Validation and Error Handling

The API uses Zod for request validation.

Validation covers:

* Required quiz titles
* Required question text
* Exactly four options per question
* Non-empty options
* Correct answer must exist within the question's options
* Required answers during submission
* Valid question IDs
* Duplicate answer prevention
* Complete quiz submissions

The API also uses centralized error-handling middleware so validation and application errors return consistent JSON responses.

Example:

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "questions.0.options",
      "message": "Each question must have exactly 4 options"
    }
  ]
}
```

## Security Considerations

Quiz answers are validated and scored on the server.

The quiz-taking endpoint does not return `correctAnswer` values to the client. This prevents the frontend from receiving the correct answers before submission.

During submission, the backend:

1. Retrieves the quiz from the database.
2. Validates submitted question IDs.
3. Validates that submitted answers belong to the question's available options.
4. Prevents duplicate answers.
5. Ensures every question has been answered.
6. Compares submitted answers with the stored correct answers.
7. Calculates the score.
8. Persists the result.

## State Management

TanStack Query is used for server state.

Examples include:

* Fetching quizzes
* Fetching individual quizzes
* Creating quizzes
* Submitting quizzes
* Fetching quiz results
* Fetching dashboard statistics

Local React state is used for UI state such as selected answers and form inputs.

This keeps server state separate from temporary UI state.

## Key Design Decisions

### Server-side score calculation

Scores are calculated on the backend rather than the frontend.

This prevents the client from being the source of truth for quiz results and keeps scoring logic centralized.

### PostgreSQL instead of localStorage

Quiz data and results are persisted in PostgreSQL so that data survives browser refreshes, different devices, and application restarts.

### Prisma ORM

Prisma provides typed database access and makes the relationships between quizzes, questions, and results explicit.

### Zod validation

Zod provides runtime validation at the API boundary while also allowing TypeScript types to be inferred from the schemas.

### Feature-based frontend architecture

Quiz-related components, API functions, hooks, and types are grouped under the quiz feature rather than being scattered throughout the application.

This makes the application easier to maintain as more quiz functionality is added.

## Setup

### Requirements

* Node.js 18+
* PostgreSQL database
* npm

### Clone the repository

```bash
git clone <repository-url>

cd student-quiz-tracker
```

### Backend setup

```bash
cd server

npm install
```

Create a `.env` file:

```env
PORT=3000
CLIENT_URL=http://localhost:5173
DATABASE_URL="your-postgresql-connection-string"
```

Generate the Prisma client:

```bash
npm run prisma:generate
```

Run database migrations:

```bash
npm run prisma:migrate
```

Start the backend:

```bash
npm run dev
```

The API will run at:

```text
http://localhost:3000
```

### Frontend setup

Open another terminal:

```bash
cd client

npm install
```

Start the development server:

```bash
npm run dev
```

The frontend will run at:

```text
http://localhost:5173
```

## Environment Variables

### Backend

| Variable       | Description                  |
| -------------- | ---------------------------- |
| `PORT`         | Backend server port          |
| `CLIENT_URL`   | Frontend URL used for CORS   |
| `DATABASE_URL` | PostgreSQL connection string |

Environment files containing credentials should never be committed to the repository.

## Available Scripts

### Client

```bash
npm run dev
npm run build
```

### Server

```bash
npm run dev
npm run build
npm start
npm run prisma:generate
npm run prisma:migrate
```

## API Health Check

The backend provides a health endpoint:

```http
GET /api/health
```

Response:

```json
{
  "success": true,
  "message": "QuizTrack API is running"
}
```

## Trade-offs

### No authentication

Authentication was intentionally excluded because it was outside the assessment requirements.

The application focuses on the core quiz creation, submission, persistence, and results workflow.

### Question options stored as JSON

Question options are stored as a PostgreSQL JSON field instead of a separate `QuestionOption` table.

For the current scope, this keeps the data model simple while still allowing exactly four options per question.

For a larger production system, options could be normalized into a separate table if they needed independent metadata, ordering, analytics, or localization.

### No user-specific results

Results are currently associated with quizzes rather than individual users because authentication and user management were outside the project scope.

## Future Improvements

Potential future improvements include:

* User authentication
* Student profiles
* Role-based access control
* Timed quizzes
* Question categories
* Difficulty levels
* Pagination and search
* Quiz editing and deletion
* More detailed performance analytics
* Exportable results
* Automated tests
* Accessibility improvements
* Audit logging

## Author

**Victor Oyewole**

Full Stack Developer

* GitHub: NobleDevStudio
* Portfolio: nobledevstudio.netlify.app
* LinkedIn: linkedin.com/in/atilola-victor-oyewole/


