
const mongoose = require('mongoose');
const quizSchema = new mongoose.Schema({
  title: String,
  description: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  questions: [{
    text: String,
    choices: [String],
    correctIndex: Number
  }]
}, { timestamps: true });
module.exports = mongoose.model('Quiz', quizSchema);
