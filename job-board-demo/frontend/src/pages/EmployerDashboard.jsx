
import React, { useState, useEffect } from 'react';
import api from '../services/api';

export default function EmployerDashboard(){
  const [jobs, setJobs] = useState([]);
  const [form, setForm] = useState({ title:'', description:'', location:'', employmentType:'Full-time' });
  useEffect(()=>{ load(); }, []);
  function load(){ api.get('/jobs').then(r=>setJobs(r.data)).catch(()=>{}); }
  async function create(e){
    e.preventDefault();
    try{ await api.post('/jobs', form); setForm({ title:'', description:'', location:'', employmentType:'Full-time' }); load(); }
    catch(err){ alert('Make sure you are logged in as employer'); }
  }
  const myId = localStorage.getItem('userId');
  return (
    <div>
      <h2>Employer Dashboard</h2>
      <form onSubmit={create} style={{marginBottom:16}}>
        <input placeholder="Title" value={form.title} onChange={e=>setForm({...form, title:e.target.value})} /><br/>
        <textarea placeholder="Description" value={form.description} onChange={e=>setForm({...form, description:e.target.value})} /><br/>
        <input placeholder="Location" value={form.location} onChange={e=>setForm({...form, location:e.target.value})} /><br/>
        <select value={form.employmentType} onChange={e=>setForm({...form, employmentType:e.target.value})}>
          <option>Full-time</option>
          <option>Part-time</option>
          <option>Contract</option>
        </select><br/>
        <button className="button">Post Job</button>
      </form>
      <h3>Your Jobs</h3>
      {jobs.filter(j=>j.employer && j.employer._id === myId).map(j=> (
        <div key={j._id} className="job-card">{j.title}</div>
      ))}
    </div>
  )
}
