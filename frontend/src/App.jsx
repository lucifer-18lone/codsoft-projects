
import React from 'react';
import { Routes,Route,Link } from 'react-router-dom';
import Home from './pages/Home';
import Create from './pages/Create';
import QuizList from './pages/QuizList';
import TakeQuiz from './pages/TakeQuiz';
import Login from './pages/Login';
import Register from './pages/Register';
export default function App(){ return (<div><header className="container"><h1><Link to="/">Quiz Maker</Link></h1><nav><Link to="/create" style={{marginRight:12}}>Create</Link><Link to="/quizzes" style={{marginRight:12}}>Quizzes</Link><Link to="/login">Login</Link></nav></header><main className="container"><Routes><Route path="/" element={<Home/>} /><Route path="/create" element={<Create/>} /><Route path="/quizzes" element={<QuizList/>} /><Route path="/quizzes/:id" element={<TakeQuiz/>} /><Route path="/login" element={<Login/>} /><Route path="/register" element={<Register/>} /></Routes></main></div>) }
