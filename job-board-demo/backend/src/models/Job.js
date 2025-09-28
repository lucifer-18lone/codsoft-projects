
const mongoose = require('mongoose');
const jobSchema = new mongoose.Schema({
  title: String,
  description: String,
  location: String,
  salary: String,
  employmentType: String,
  tags: [String],
  employer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Job', jobSchema);
