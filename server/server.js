const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const connectDB = require('./config/db');
const setupSwagger = require('./config/swagger');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Swagger Documentation
setupSwagger(app);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Security headers
app.use(helmet({
    crossOriginResourcePolicy: false,
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", "https://*"],
            styleSrc: ["'self'", "'unsafe-inline'", "https://*"],
            imgSrc: ["'self'", "data:", "blob:", "https://*", "http://*"],
            frameSrc: ["'self'", "https://*"],
            fontSrc: ["'self'", "https://*", "data:"],
            connectSrc: ["'self'", "ws:", "wss:", "http:", "https:"]
        }
    }
}));

// CORS config
const corsOptions = {
    origin: ['http://localhost:5173', 'http://localhost:5174', process.env.CLIENT_URL],
    credentials: true,
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Static files (for uploads)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/admin', require('./routes/admin'));
app.use('/api/users', require('./routes/user'));
app.use('/api/packages', require('./routes/packages'));
app.use('/api/destinations', require('./routes/destinations'));
app.use('/api/testimonials', require('./routes/testimonials'));
app.use('/api/gallery', require('./routes/gallery'));
app.use('/api/bookings', require('./routes/bookings'));
app.use('/api/upload', require('./routes/upload'));
app.use('/api/contact', require('./routes/contact'));
app.use('/api/local-videos', require('./routes/localVideos'));

// Static folders
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/videos', express.static(path.join(__dirname, '../client/public/videos')));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static(path.join(__dirname, '../client/dist')));

    app.get('/*path', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../client', 'dist', 'index.html'));
    });
} else {
    app.get('/', (req, res) => {
        res.send('API is running...');
    });
}

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: err.message || 'Server Error'
    });
});

// Connect BullMQ
const { connectProducer } = require('./events/producer');
const { connectConsumer } = require('./events/consumer');

// Initialize BullMQ Workers (Non-blocking)
console.log('Initializing BullMQ connections...');
connectProducer();
connectConsumer();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
