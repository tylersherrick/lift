const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
  name: { type: String, required: true },
  duration: { type: Number, required: true },  // Duration in minutes
  type: { type: String, required: true },
});

const Workout = mongoose.model('Workout', workoutSchema);

module.exports = Workout;
