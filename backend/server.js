const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors'); // Import CORS middleware
const DBconnect = require('./config/db');
const userRoute = require('./routes/userRoute');
const noteRoute = require('./routes/noteRoute');
const { errorHandler, notFound } = require('./middlewares/errorMiddleware');

dotenv.config();
DBconnect();

const app = express();

// ✅ Enable CORS for all origins
app.use(cors({ origin: "*" })); 

app.use(express.json());

// Root route for testing
app.get('/', (req, res) => {
    res.send("API is Running");
});

// API routes
app.use("/api/users", userRoute);
app.use("/api/notes", noteRoute);

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));
