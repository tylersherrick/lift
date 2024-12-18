const express = require('express');
const mongoose = require('mongoose');
const app = express();

// In-memory array to store workouts
let workouts = [];

// MongoDB connection setup
mongoose.connect('mongodb://localhost:27017/workoutsDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Error connecting to MongoDB:', err);
});

app.use(express.json());

// Workout model (schema)
const workoutSchema = new mongoose.Schema({
  name: String,
  duration: Number,
  type: String
});

const Workout = mongoose.model('Workout', workoutSchema);

// POST route to add a workout
app.post('/workouts', async (req, res) => {
  const { name, duration, type } = req.body;
  
  // Check if all required fields are present
  if (!name || !duration || !type) {
    return res.status(400).send('Please provide name, duration, and type.');
  }

  try {
    // Create a new workout document
    const newWorkout = new Workout({
      name,
      duration,
      type
    });

    // Save the workout to MongoDB
    await newWorkout.save();

    res.status(201).send('Workout added!');
  } catch (err) {
    res.status(500).send('Error adding workout to MongoDB');
  }
});

// Get all workouts
app.get('/workouts', async (req, res) => {
  try {
    const allWorkouts = await Workout.find();
    res.json(allWorkouts);
  } catch (err) {
    res.status(500).send('Error fetching workouts from MongoDB');
  }
});

app.put('/workouts/:id', async (req, res) => {
  const { id } = req.params;
  console.log("ID received:", id); // Debugging step
  const { title, load, reps } = req.body;

  try {
    const workout = await Workout.findByIdAndUpdate(
      id,
      { title, load, reps },
      { new: true, runValidators: true } // Ensure the updated document is returned
    );

    if (!workout) {
      return res.status(404).json({ error: 'Workout not found' });
    }

    res.status(200).json(workout);
  } catch (error) {
    console.error(error.message); // Debugging step
    res.status(400).json({ error: error.message });
  }
});

// Start server
app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
