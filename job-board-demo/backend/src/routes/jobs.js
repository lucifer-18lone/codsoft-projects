
const express = require('express');
const Job = require('../models/Job');
const auth = require('../middlewares/auth');

const router = express.Router();

// GET /api/jobs
router.get('/', async (req, res) => {
  try {
    const { q, location, page = 1, limit = 10 } = req.query;
    const filter = { isActive: true };
    if (q) filter.$or = [{ title: new RegExp(q, 'i') }, { description: new RegExp(q, 'i') }];
    if (location) filter.location = new RegExp(location, 'i');
    const skip = (page - 1) * limit;
    const jobs = await Job.find(filter).sort({ createdAt: -1 }).skip(Number(skip)).limit(Number(limit)).populate('employer', 'name company');
    res.json(jobs);
  } catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }); }
});

// GET /api/jobs/:id
router.get('/:id', async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate('employer', 'name company email');
    if (!job) return res.status(404).json({ message: 'Not found' });
    res.json(job);
  } catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }); }
});

// POST /api/jobs (employer only)
router.post('/', auth, async (req, res) => {
  try {
    if (req.user.role !== 'employer') return res.status(403).json({ message: 'Only employers can post jobs' });
    const job = new Job({ ...req.body, employer: req.user.id });
    await job.save();
    res.status(201).json(job);
  } catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }); }
});

// PUT /api/jobs/:id
router.put('/:id', auth, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: 'Not found' });
    if (String(job.employer) !== req.user.id) return res.status(403).json({ message: 'Forbidden' });
    Object.assign(job, req.body);
    await job.save();
    res.json(job);
  } catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }); }
});

// DELETE /api/jobs/:id
router.delete('/:id', auth, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: 'Not found' });
    if (String(job.employer) !== req.user.id) return res.status(403).json({ message: 'Forbidden' });
    await job.remove();
    res.json({ message: 'Deleted' });
  } catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }); }
});

module.exports = router;
