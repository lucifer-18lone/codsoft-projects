
import React, {useEffect,useState} from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
export default function TakeQuiz(){
  const {id}=useParams();
  const [quiz,setQuiz]=useState(null);
  const [answers,setAnswers]=useState([]);
  const [result,setResult]=useState(null);
  useEffect(()=>{ api.get(`/quizzes/${id}`).then(r=>{ setQuiz(r.data); setAnswers(new Array(r.data.questions.length).fill(null)); }).catch(()=>{}); },[id]);
  function pick(i,choice){ const a=[...answers]; a[i]=choice; setAnswers(a); }
  async function submit(){ try{ const res = await api.post(`/attempts/${id}`, {answers}); setResult(res.data); }catch(e){ alert('Login required or error'); } }
  if(!quiz) return <div>Loading...</div>;
  if(result) return (<div><h2>Result: {result.score}/{result.total}</h2><h3>Correct answers:</h3><pre>{JSON.stringify(result.correctAnswers,null,2)}</pre></div>)
  return (<div><h2>{quiz.title}</h2>{quiz.questions.map((q,qi)=>(<div key={qi} className='card'><div>{q.text}</div>{q.choices.map((c,ci)=>(<div key={ci}><label><input type='radio' name={'q'+qi} checked={answers[qi]===ci} onChange={()=>pick(qi,ci)} /> {c}</label></div>))}</div>))}<button className='button' onClick={submit}>Submit</button></div>)
}
