
const express = require('express');
const auth = require('../middlewares/auth');
const upload = require('../utils/upload');
const Application = require('../models/Application');
const Job = require('../models/Job');
const User = require('../models/User');
const nodemailer = require('nodemailer');

const router = express.Router();

// POST /api/jobs/:id/apply
router.post('/jobs/:id/apply', auth, upload.single('resume'), async (req, res) => {
  try {
    if (req.user.role !== 'seeker') return res.status(403).json({ message: 'Only seekers can apply' });
    const job = await Job.findById(req.params.id).populate('employer');
    if (!job) return res.status(404).json({ message: 'Job not found' });
    const resumeUrl = req.file ? `/uploads/${req.file.filename}` : '';
    const application = new Application({ job: job._id, seeker: req.user.id, resumeUrl, coverLetter: req.body.coverLetter });
    await application.save();

    // send emails (candidate confirmation & notify employer) — basic nodemailer
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
      });
      // Candidate email
      const seeker = await User.findById(req.user.id);
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: seeker.email,
        subject: 'Application received',
        text: `Your application for ${job.title} has been received.`
      });
      // Employer email
      if (job.employer && job.employer.email) {
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: job.employer.email,
          subject: `New applicant for ${job.title}`,
          text: `${seeker.name} applied for ${job.title}. Resume: ${resumeUrl ? process.env.BASE_URL + resumeUrl : 'No resume attached'}`
        });
      }
    } catch (e) {
      console.warn('Email failed', e.message);
    }

    res.status(201).json({ message: 'Applied' });
  } catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }); }
});

// GET /api/jobs/:id/applications (employer)
router.get('/jobs/:id/applications', auth, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found' });
    if (String(job.employer) !== req.user.id) return res.status(403).json({ message: 'Forbidden' });
    const apps = await Application.find({ job: job._id }).populate('seeker', 'name email');
    res.json(apps);
  } catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }); }
});

// GET /api/users/:id/applications (seeker)
router.get('/users/:id/applications', auth, async (req, res) => {
  try {
    if (req.user.id !== req.params.id && req.user.role !== 'employer') return res.status(403).json({ message: 'Forbidden' });
    const apps = await Application.find({ seeker: req.params.id }).populate('job');
    res.json(apps);
  } catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }); }
});

module.exports = router;
