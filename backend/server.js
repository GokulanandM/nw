// server.js
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

const app = express();
app.use(cors());

// Define mongoURI
const mongoURI = "mongodb+srv://gokulkvmhs2020:gokul123@gokulanand.6360r1o.mongodb.net/?retryWrites=true&w=majority&appName=Gokulanand";
const jwtSecret = 'J1c2VybmFtZSI6Imdva3VsYW5hbmQiLCJleHAiOjE3MzAxNDY4NjJ9.Jta2nQQ4apKvJ2JECiqjQyvyCrdHRbH9JT1tILT1EQM';

// Connect to MongoDB
connectDB(mongoURI); // Pass mongoURI to connectDB

// Middleware to parse JSON
app.use(express.json({ extended: false }));

// Check if jwtSecret is defined
if (!jwtSecret) {
  console.error("Error: JWT_SECRET is not defined.");
  process.exit(1); // Exit if JWT_SECRET is missing
}

// Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/cars', require('./routes/api/cars'));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
