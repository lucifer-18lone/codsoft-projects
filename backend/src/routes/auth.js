
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();
router.post('/register', async (req,res)=>{
  try{ const {name,email,password}=req.body; if(!name||!email||!password) return res.status(400).json({message:'Missing fields'});
    const exist = await User.findOne({email}); if(exist) return res.status(400).json({message:'Email exists'});
    const salt = await bcrypt.genSalt(10); const passwordHash = await bcrypt.hash(password,salt);
    const user = new User({name,email,passwordHash}); await user.save();
    const token = jwt.sign({id:user._id}, process.env.JWT_SECRET);
    res.json({token, user:{id:user._id,name:user.name,email:user.email}});
  }catch(e){ console.error(e); res.status(500).json({message:'Server error'}); }
});
router.post('/login', async (req,res)=>{
  try{ const {email,password}=req.body; const user = await User.findOne({email}); if(!user) return res.status(400).json({message:'Invalid credentials'});
    const ok = await bcrypt.compare(password, user.passwordHash); if(!ok) return res.status(400).json({message:'Invalid credentials'});
    const token = jwt.sign({id:user._id}, process.env.JWT_SECRET); res.json({token, user:{id:user._id,name:user.name,email:user.email}});
  }catch(e){ console.error(e); res.status(500).json({message:'Server error'}); }
});
module.exports = router;
