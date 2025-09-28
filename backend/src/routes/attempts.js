
const express = require('express');
const auth = require('../middlewares/auth');
const Quiz = require('../models/Quiz');
const Attempt = require('../models/Attempt');
const router = express.Router();
router.post('/:quizId', auth, async (req,res)=>{
  try{
    const {answers} = req.body;
    const quiz = await Quiz.findById(req.params.quizId);
    if(!quiz) return res.status(404).json({message:'Not found'});
    let score = 0;
    for(let i=0;i<quiz.questions.length;i++){ if(answers[i] === quiz.questions[i].correctIndex) score++; }
    const attempt = new Attempt({quiz:quiz._id,user:req.user.id,answers,score});
    await attempt.save();
    res.json({score, total:quiz.questions.length, correctAnswers: quiz.questions.map(q=>q.correctIndex)});
  }catch(e){ console.error(e); res.status(500).json({message:'Server error'}); }
});
module.exports = router;
