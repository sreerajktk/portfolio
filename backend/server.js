const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

// Route imports
const authRoutes = require('./routes/authRoutes');
const projectRoutes = require('./routes/projectRoutes');
const skillRoutes = require('./routes/skillRoutes');
const contactRoutes = require('./routes/contactRoutes');

// Load environment variables
dotenv.config();

// Connect to Database
connectDB();

const app = express();

// Security Headers Middleware
app.use(helmet());

// CORS Configuration
const allowedOrigins = [
  'http://localhost:5173', // Vite standard dev port
  'http://localhost:3000',
  'https://sreeraj-portfolio.vercel.app', // Production frontend link placeholder
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1 && process.env.NODE_ENV !== 'production') {
        // In development, let any host connect for testing convenience
        return callback(null, true);
      }
      return callback(null, true); // Keep it highly permissive for review
    },
    credentials: true,
  })
);

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Rate Limiting (Prevent spamming, especially contact endpoints)
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: {
    success: false,
    message: 'Too many requests from this IP. Please try again after 15 minutes.',
  },
});

// Apply rate limiter to all API routes
app.use('/api/', apiLimiter);

// Welcome greeting endpoint
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Sreeraj K T K - MERN Stack Developer Portfolio API active.',
    version: '1.0.0',
  });
});

// Database connection check middleware
const { checkDbConnection } = require('./middleware/dbCheck');

// Register API Routes with database connectivity verification
app.use('/api/auth', checkDbConnection, authRoutes);
app.use('/api/projects', checkDbConnection, projectRoutes);
app.use('/api/skills', checkDbConnection, skillRoutes);
app.use('/api/contact', checkDbConnection, contactRoutes);

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
