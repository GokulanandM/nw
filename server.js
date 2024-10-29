// server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json()); // Middleware to parse JSON

// MongoDB connection URI from environment variables
const mongoURI = process.env.MONGO_URI || "mongodb+srv://gokulkvmhs2020:gokul123@gokulanand.6360r1o.mongodb.net/?retryWrites=true&w=majority&appName=Gokulanand";


// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => {
    console.error(`MongoDB connection error: ${err.message}`);
    process.exit(1); // Exit if connection fails
  });

// Define a Mongoose schema and model (for example, a Car model)
const carSchema = new mongoose.Schema({
  make: String,
  model: String,
  year: Number,
});

const Car = mongoose.model('Car', carSchema);

// Routes

// GET all cars
app.get('/api/cars', async (req, res) => {
  try {
    const cars = await Car.find();
    
    // Print the cars to the console
    console.log('Retrieved Cars:', cars);
    
    // Print each car in the response
    const carValues = cars.map(car => `Make: ${car.make}, Model: ${car.model}, Year: ${car.year}`).join('; ');

    res.json({ message: 'Cars retrieved successfully', cars, carValues });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST a new car
app.post('/api/cars', async (req, res) => {
  try {
    const newCar = new Car(req.body);
    const car = await newCar.save();
    res.status(201).json(car);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE a car by ID
app.delete('/api/cars/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Car.findByIdAndDelete(id);
    res.status(200).json({ message: 'Car deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update a car by ID
app.put('/api/cars/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCar = await Car.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updatedCar);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Define the port and start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});