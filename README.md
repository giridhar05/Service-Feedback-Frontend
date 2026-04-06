# Service-Feedback-Frontend

## Architecture Overview

Service-Feedback Platform follows a client-server architecture:

- Frontend handles user interaction
- Backend processes requests and business logic
- MongoDB stores feedback data

### System Flow

User → Frontend UI → API Request → Backend Server → Database  
Database → Backend → Response → Frontend → User Interface

---

## Features
- User-friendly feedback submission form
- Category-based feedback selection
- Responsive design
- API integration with backend
- Scalable component structure

---

## Frontend Architecture & Flow

### Component Flow

User Interaction → Form Component → API Call → Response Handling → UI Update

### Detailed Flow

1. User fills the feedback form
2. Form data is validated on the client side
3. API request is sent to backend using fetch/axios
4. Backend processes and stores data
5. Response is returned to frontend
6. UI updates with success/error message

---

### Data Flow Diagram (Text Representation)

[User Input]
      ↓
[Form Component]
      ↓
[API Call]
      ↓
[Backend Server]
      ↓
[Database]
      ↓
[Response]
      ↓
[UI Update]

---

### Design Principles

- Separation of concerns (UI vs API logic)
- Reusable components
- Environment-based configuration
- Minimal coupling with backend

---

## Tech Stack
- Vite
- React
- HTML
- CSS
- JavaScript

---

## Project Setup

### 1. Clone the Repository
git clone https://github.com/giridhar05/Service-Feedback-Frontend.git  
cd frontend

---

### 2. Install Dependencies
npm install

---

### 3. Configure Environment
Create a `.env` file:

VITE_API_BASE_URL=http://localhost:5000

---

### 4. Run the Application
npm run dev

---

## Folder Structure
src/
├── components/
├── pages/
├── assets/
└── main.js

---

## Backend Repository
https://github.com/giridhar05/Service-Feedback-Backend


---

## Future Improvements
- Authentication system
- Admin dashboard UI
- Feedback analytics visualization

---

## Deployment
- Vercel https://service-feedback-ashen.vercel.app
