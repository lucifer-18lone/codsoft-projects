
const express = require('express');
const Quiz = require('../models/Quiz');
const auth = require('../middlewares/auth');
const router = express.Router();
router.post('/', auth, async (req,res)=>{ try{ const {title,description,questions} = req.body; const quiz = new Quiz({title,description,questions,author:req.user.id}); await quiz.save(); res.status(201).json(quiz); }catch(e){ console.error(e); res.status(500).json({message:'Server error'}); } });
router.get('/', async (req,res)=>{ const quizzes = await Quiz.find().select('title description author createdAt').populate('author','name'); res.json(quizzes); });
router.get('/:id', async (req,res)=>{ const quiz = await Quiz.findById(req.params.id).populate('author','name'); if(!quiz) return res.status(404).json({message:'Not found'}); res.json(quiz); });
module.exports = router;
