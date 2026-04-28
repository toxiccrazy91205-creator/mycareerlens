# MyCareerLens - MERN Stack Application

A complete MERN stack (MongoDB-Express-React-Node.js) application that preserves the original MyCareerLens UI, design, styling, and functionality.

## Project Structure

```
mycareerlens/
├── client/                    # React frontend
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/        # React components
│   │   │   ├── Landing.js
│   │   │   ├── ProfileWizard.js
│   │   │   ├── Welcome.js
│   │   │   ├── QuestionWizard.js
│   │   │   ├── Results.js
│   │   │   ├── AccessibilityPanel.js
│   │   │   ├── Toast.js
│   │   │   └── SaveIndicator.js
│   │   ├── services/
│   │   │   └── api.js        # API service layer
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
│   └── package.json
│
├── server/                    # Express backend
│   ├── src/
│   │   ├── models/          # MongoDB models
│   │   │   ├── Session.js
│   │   │   ├── Profile.js
│   │   │   ├── Result.js
│   │   │   └── Stats.js
│   │   ├── routes/
│   │   │   └── api.js       # API routes
│   │   ├── utils/
│   │   │   └── careerEngine.js
│   │   └── index.js        # Server entry point
│   ├── config/
│   │   └── index.js        # Configuration
│   └── package.json
│
└── README.md
```

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- MongoDB (v4.4 or higher)

## Setup Instructions

### 1. Database Setup

**Option A: Local MongoDB**

- Install MongoDB Community Server from https://www.mongodb.com/try/download/community
- Start MongoDB: `mongod`

**Option B: MongoDB Atlas (Cloud)**

- Create account at https://www.mongodb.com/cloud/atlas
- Create cluster and get connection string

### 2. Backend Setup

```bash
cd server
npm install
```

Create `.env` file in server folder:

```env
MONGO_URI=mongodb://localhost:27017/mycareerlens
# Or for Atlas:
# MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/mycareerlens
PORT=5000
CORS_ORIGIN=http://localhost:3000
```

Start the server:

```bash
npm start
# OR for development with auto-restart:
npm run dev
```

Server runs on http://localhost:5000

### 3. Frontend Setup

```bash
cd client
npm install
```

Create `.env` file in client folder:

```env
npm
```

Start the frontend:

```bash
npm start
```

Client runs on http://localhost:3000

## API Endpoints

| Method | Endpoint                   | Description                    |
| ------ | -------------------------- | ------------------------------ |
| POST   | `/api/sessions`            | Create new session             |
| GET    | `/api/sessions/:sessionId` | Get session                    |
| PUT    | `/api/sessions/:sessionId` | Update session with answers    |
| GET    | `/api/results/:sessionId`  | Get profile and career results |
| GET    | `/api/stats`               | Get visit/completion counts    |

## Features

- ✅ All original UI/UX design preserved
- ✅ All class names and CSS
- ✅ Full accessibility features (dark mode, high contrast, font size, dyslexia font)
- ✅ All 5 psychometric frameworks (RIASEC, Big Five, Multiple Intelligences, VARK, EQ)
- ✅ Profile wizard with age/class selection
- ✅ Question wizard with "I'm not sure" option
- ✅ Results with 4 tabs (Profile, Careers, Action Plan, Parent Guide)
- ✅ MongoDB database storage (no localStorage)
- ✅ Auto-save progress every 3 seconds
- ✅ Global visit/completion stats tracking

## Original Credits

- **Creator:** Mr. Rajan Tonape (Visionary for Young India)
- **Frameworks:** Holland's RIASEC, Big Five, Gardner's Multiple Intelligences, Fleming's VARK, Goleman's EQ
- **Purpose:** 100% free career test for Indian students aged 6-21

This is a personal non-commercial gift to Indian students and their families.
