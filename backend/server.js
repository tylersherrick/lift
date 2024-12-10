const express = require('express');
const app = express();
const port = 5000;

// Middleware to handle JSON
app.use(express.json());

let workouts = [];

// GET route
app.get('/', (req, res) => {
  res.send('Hello, Express!');
});

app.get('/workouts', (req, res) => {
  res.json(workouts);
});


// POST route
app.post('/workout', (req, res) => {
  const { title, sets, reps } = req.body;
  const workout = { title, sets, reps };
  workouts.push(workout); // Add workout to the array
  console.log(`Workout added: ${title}, Sets: ${sets}, Reps: ${reps}`);
  res.send('Workout data received!');
});


// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
