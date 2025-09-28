
const mongoose = require('mongoose');
const attemptSchema = new mongoose.Schema({
  quiz: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  answers: [Number],
  score: Number
}, { timestamps: true });
module.exports = mongoose.model('Attempt', attemptSchema);
