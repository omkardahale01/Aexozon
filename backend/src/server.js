import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables
dotenv.config();

// Import database connection
import connectDB from './config/database.js';

// Import routes
import routes from './routes/index.js';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Express app
const app = express();

// Connect to Database
connectDB();

// CORS configuration
const corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = process.env.ALLOWED_ORIGINS 
      ? process.env.ALLOWED_ORIGINS.split(',') 
      : ['http://localhost:5173', 'http://localhost:3000', 'http://localhost:4173'];
    
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin) || process.env.NODE_ENV === 'development') {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// API Routes
app.use('/api', routes);

// Serve static uploads
app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));

// Serve static files from the React app (in production)
if (process.env.NODE_ENV === 'production') {
  const staticPath = path.join(__dirname, '../../frontend/dist');
  app.use(express.static(staticPath));

  app.get('*', (req, res) => {
    res.sendFile(path.join(staticPath, 'index.html'));
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
});

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`
╔══════════════════════════════════════════════════════════╗
║                                                          ║
║   AEXOZON - Backend Server                               ║
║                                                          ║
╠══════════════════════════════════════════════════════════╣
║   Environment: ${process.env.NODE_ENV || 'development'}${' '.repeat(33 - (process.env.NODE_ENV || 'development').length)}║
║   Port: ${PORT}${' '.repeat(43 - String(PORT).length)}║
║   API URL: http://localhost:${PORT}/api${' '.repeat(26 - String(PORT).length)}║
║   Health Check: http://localhost:${PORT}/api/health${' '.repeat(16 - String(PORT).length)}║
║                                                          ║
╚══════════════════════════════════════════════════════════╝
  `);
});

export default app;
