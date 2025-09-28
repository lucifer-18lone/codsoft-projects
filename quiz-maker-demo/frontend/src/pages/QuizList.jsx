
import React, {useEffect,useState} from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';
export default function QuizList(){
  const [quizzes,setQuizzes]=useState([]);
  useEffect(()=>{ api.get('/quizzes').then(r=>setQuizzes(r.data)).catch(()=>{}); },[]);
  return (<div><h2>Available Quizzes</h2>{quizzes.map(q=>(<div key={q._id} className='card'><h3>{q.title}</h3><p>{q.description}</p><div>By: {q.author?.name || 'Unknown'}</div><Link to={`/quizzes/${q._id}`} className='button' style={{marginTop:8}}>Take Quiz</Link></div>))}</div>)
}
