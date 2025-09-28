
import React, { useEffect, useState } from 'react';
import api from '../services/api';
import JobCard from '../components/JobCard';

export default function Jobs(){
  const [jobs, setJobs] = useState([]);
  const [q, setQ] = useState('');
  useEffect(()=>{ load(); }, []);
  function load(){ api.get('/jobs').then(r=>setJobs(r.data)).catch(()=>{}); }
  function onSearch(e){ e.preventDefault(); api.get(`/jobs?q=${encodeURIComponent(q)}`).then(r=>setJobs(r.data)); }
  return (
    <div>
      <h2>All Jobs</h2>
      <form onSubmit={onSearch} style={{marginBottom:12}}>
        <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Search jobs..." />
        <button className="button" style={{marginLeft:8}}>Search</button>
      </form>
      {jobs.map(j=> <JobCard key={j._id} job={j} />)}
    </div>
  )
}
