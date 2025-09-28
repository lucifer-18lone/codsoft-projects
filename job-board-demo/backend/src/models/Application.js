
const mongoose = require('mongoose');
const applicationSchema = new mongoose.Schema({
  job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job' },
  seeker: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  resumeUrl: String,
  coverLetter: String,
  status: { type: String, default: 'applied' }
}, { timestamps: true });

module.exports = mongoose.model('Application', applicationSchema);
