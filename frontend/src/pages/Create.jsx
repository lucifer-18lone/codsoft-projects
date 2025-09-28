
import React, {useState} from 'react';
import api from '../services/api';
export default function Create(){
  const [title,setTitle]=useState(''); const [description,setDescription]=useState('');
  const [questions,setQuestions]=useState([{text:'',choices:['',''],correctIndex:0}]);
  function addQuestion(){ setQuestions([...questions,{text:'',choices:['',''],correctIndex:0}]); }
  function addChoice(qi){ const qs=[...questions]; qs[qi].choices.push(''); setQuestions(qs); }
  function updateQuestion(qi,field,val){ const qs=[...questions]; qs[qi][field]=val; setQuestions(qs); }
  function updateChoice(qi,ci,val){ const qs=[...questions]; qs[qi].choices[ci]=val; setQuestions(qs); }
  async function submit(e){ e.preventDefault(); try{ await api.post('/quizzes',{title,description,questions}); alert('Quiz created'); setTitle(''); setDescription(''); setQuestions([{text:'',choices:['',''],correctIndex:0}]); }catch(e){ alert('Login required or error'); } }
  return (<div><h2>Create Quiz</h2><form onSubmit={submit}><input placeholder='Title' value={title} onChange={e=>setTitle(e.target.value)} /><textarea placeholder='Description' value={description} onChange={e=>setDescription(e.target.value)} />{questions.map((q,qi)=>(<div key={qi} className='card'><input placeholder={`Question ${qi+1}`} value={q.text} onChange={e=>updateQuestion(qi,'text',e.target.value)} />{q.choices.map((c,ci)=>(<div key={ci}><input placeholder={`Choice ${ci+1}`} value={c} onChange={e=>updateChoice(qi,ci,e.target.value)} /></div>))}<button type='button' className='button' onClick={()=>addChoice(qi)}>Add Choice</button><div><label>Correct answer index: </label><input type='number' value={q.correctIndex} onChange={e=>updateQuestion(qi,'correctIndex',Number(e.target.value))} /></div></div>))}<button type='button' className='button' onClick={addQuestion}>Add Question</button><br/><button className='button' style={{marginTop:8}}>Create Quiz</button></form></div>)
}
