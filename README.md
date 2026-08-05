# ResumeAI — AI-Powered Resume Analyzer

A full-stack SaaS platform that parses resumes, generates AI-powered ATS scores, matches resumes against job descriptions, and provides actionable improvement suggestions — all powered by Google's Gemini AI.

**Live App:** [resume-analyzer-frontend-6fx4.onrender.com](https://resume-analyzer-frontend-6fx4.onrender.com)
**Backend API:** [resume-analyzer-backend-8fao.onrender.com](https://resume-analyzer-backend-8fao.onrender.com)

---

## Features

- **Authentication** — Secure JWT-based register/login with role-based access and BCrypt password hashing
- **Resume Upload** — Drag-and-drop upload for PDF and DOCX resumes with validation
- **Resume Parsing** — Automatic extraction of name, email, phone, LinkedIn, and GitHub using Apache PDFBox and Apache POI
- **AI-Powered ATS Scoring** — Google Gemini AI evaluates resumes across formatting, keywords, grammar, projects, experience, education, and skills
- **Job Description Matching** — Paste any job description to get a match percentage, matched/missing skills, and tailored recommendations
- **PDF Report Generation** — Download a complete analysis report as a PDF
- **User Profile** — Editable profile with photo upload, bio, and contact details
- **Resume History** — View, manage, and delete previously uploaded resumes
- **Responsive Design** — Fully responsive UI across mobile, tablet, and desktop
- **Animated Landing Page** — Built with Framer Motion and GSAP for smooth scroll and entrance animations

---

## Tech Stack

### Frontend
- React 19 + TypeScript
- Vite
- Tailwind CSS + shadcn/ui (Base UI)
- React Router
- React Hook Form + Zod
- Axios
- Framer Motion + GSAP
- Lucide Icons

### Backend
- Java 21 + Spring Boot
- Spring Security + JWT Authentication
- Spring Data JPA + Hibernate
- PostgreSQL
- Apache PDFBox & Apache POI (resume parsing)
- Google Gemini AI (ATS scoring, job matching, PDF reports)
- Maven

### Deployment
- Frontend & Backend: Render
- Database: Render PostgreSQL

---

## Project Structure

This project is split into two repositories:

| Repository | Description |
|---|---|
| [resume-analyzer-backend](https://github.com/rohit6522/resume-analyzer-backend) | Spring Boot REST API |
| [resume-analyzer-frontend](https://github.com/rohit6522/resume-analyzer-frontend) | React + TypeScript client |

---

## Getting Started

### Prerequisites
- Java 21
- Node.js 18+
- PostgreSQL
- A Google Gemini API key ([get one here](https://aistudio.google.com/app/apikey))

### Backend Setup

```bash
git clone https://github.com/rohit6522/resume-analyzer-backend.git
cd resume-analyzer-backend
```

Create `src/main/resources/application-secrets.properties`:

```properties
gemini.api.key=YOUR_GEMINI_API_KEY
gemini.api.url=https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite:generateContent
```

Update `application.properties` with your local PostgreSQL credentials, then run:

```bash
./mvnw spring-boot:run
```

Backend runs on `http://localhost:8080`.

### Frontend Setup

```bash
git clone https://github.com/rohit6522/resume-analyzer-frontend.git
cd resume-analyzer-frontend
npm install
```

Create a `.env` file:

```env
VITE_API_BASE_URL=http://localhost:8080/api
```

Run the dev server:

```bash
npm run dev
```

Frontend runs on `http://localhost:5173`.

---

## API Overview

| Endpoint | Method | Description |
|---|---|---|
| `/api/auth/register` | POST | Register a new user |
| `/api/auth/login` | POST | Log in and receive a JWT |
| `/api/resumes/upload` | POST | Upload a resume (PDF/DOCX) |
| `/api/resumes` | GET | List all resumes for the logged-in user |
| `/api/resumes/{id}/parsed-data` | GET | Get parsed resume data |
| `/api/resumes/{id}/generate-ats-score` | POST | Generate an AI-powered ATS score |
| `/api/resumes/{id}/match-job` | POST | Match resume against a job description |
| `/api/resumes/{id}/report` | GET | Download a PDF analysis report |
| `/api/users/me` | GET / PUT | Get or update the current user's profile |
| `/api/users/me/photo` | POST | Upload a profile photo |

All endpoints except `/api/auth/**` and `/api/health` require a valid JWT in the `Authorization: Bearer <token>` header.

---

## Screenshots

_Add screenshots of the landing page, dashboard, and ATS score view here._

---

## License

This project was built for learning and portfolio purposes.

---

## Author

**Rohit Kumar**
[GitHub](https://github.com/rohit6522) · [LinkedIn](#)