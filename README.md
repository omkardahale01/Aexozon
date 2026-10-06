# Santosh Khandagale - Multi-Page Portfolio

A lavish, premium multi-page portfolio website built with React, TypeScript, Tailwind CSS, and Node.js/Express backend.

![Portfolio Preview](./public/hero-bg.jpg)

## Features

- **Multi-Page Architecture** - Separate pages for Home, About, Experience, Projects, and Contact
- **Premium Dark Theme** - Sophisticated cyberpunk-inspired design with neon accents
- **3D Effects** - Interactive 3D tilt effects, hover animations, and smooth transitions
- **Smooth Animations** - Framer Motion and GSAP-powered page transitions and scroll animations
- **Responsive Design** - Fully responsive across all devices
- **Contact Form** - Functional contact form with backend API
- **MongoDB Integration** - Database storage for contact submissions

## Tech Stack

### Frontend
- React 18 + TypeScript
- React Router DOM (Multi-page routing)
- Tailwind CSS
- Framer Motion (Animations)
- GSAP (Advanced animations)
- Lucide React (Icons)

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- CORS
- Express Validator

## Project Structure

```
├── backend/                    # Node.js/Express Backend
│   ├── src/
│   │   ├── config/database.js  # Database connection (swappable)
│   │   ├── controllers/        # Business logic
│   │   ├── models/             # MongoDB schemas
│   │   ├── routes/             # API routes
│   │   └── server.js           # Entry point
│   ├── .env.example            # Environment template
│   └── package.json
├── src/
│   ├── pages/                  # Page components
│   │   ├── Home.tsx
│   │   ├── About.tsx
│   │   ├── Experience.tsx
│   │   ├── Projects.tsx
│   │   └── Contact.tsx
│   ├── components/             # Reusable components
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── data/                   # Portfolio data
│   │   └── portfolioData.ts
│   ├── types/                  # TypeScript types
│   │   └── index.ts
│   ├── App.tsx                 # Main app with routing
│   └── main.tsx
├── public/                     # Static assets
└── package.json
```

## Pages

1. **Home** - Hero section with 3D profile image effect, stats, and tech stack preview
2. **About** - Professional summary, education, certifications, achievements & interests
3. **Experience** - Interactive timeline showcasing work history
4. **Projects** - Detailed project cards with modal view for each project
5. **Contact** - Contact form and information

## Getting Started

### Prerequisites

- Node.js 18+ installed
- MongoDB installed locally OR MongoDB Atlas account

### Installation

1. **Install Frontend Dependencies**
   ```bash
   npm install
   ```

2. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   cd ..
   ```

3. **Set up Environment Variables**
   ```bash
   cd backend
   cp .env.example .env
   # Edit .env with your MongoDB URI
   ```

### Running the Application

#### Option 1: Run Frontend and Backend Separately

**Terminal 1 - Frontend:**
```bash
npm run dev
```
Frontend runs at: `http://localhost:5173`

**Terminal 2 - Backend:**
```bash
cd backend
npm run dev
```
Backend runs at: `http://localhost:5000`

#### Option 2: Build for Production

```bash
npm run build
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| POST | `/api/contact` | Submit contact form |
| GET | `/api/contact` | Get all contacts |
| GET | `/api/contact/stats` | Get contact statistics |

## Database Setup

### Option A: Local MongoDB
```bash
# Install MongoDB locally
MONGODB_URI=mongodb://localhost:27017/santosh_portfolio
```

### Option B: MongoDB Atlas (Cloud)
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/santosh_portfolio
```

## Customization

### Update Content

Edit `/src/data/portfolioData.ts` to change:
- Personal information
- Professional summary
- Experience details
- Projects
- Skills
- Contact info

### Update Photos

Replace images in `/public/` folder.

### Switch Database

Update `backend/src/config/database.js` to use PostgreSQL, MySQL, etc.

## License

MIT License

---

**Connect with me:**
- Email: skhandagle1233@gmail.com
- Phone: +91 8999427831
- Location: Pune, India
