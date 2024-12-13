const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
  name: { type: String, required: true },
  duration: { type: Number, required: true },
  type: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Workout', workoutSchema);

