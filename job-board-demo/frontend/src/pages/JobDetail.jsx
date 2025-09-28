
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';

export default function JobDetail(){
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [cover, setCover] = useState('');
  const [resume, setResume] = useState(null);
  const [msg, setMsg] = useState('');
  useEffect(()=>{ api.get(`/jobs/${id}`).then(r=>setJob(r.data)).catch(()=>{}); }, [id]);

  async function apply(e){
    e.preventDefault();
    const form = new FormData();
    form.append('coverLetter', cover);
    if (resume) form.append('resume', resume);
    try{
      await api.post(`/jobs/${id}/apply`, form, { headers: {'Content-Type':'multipart/form-data'} });
      setMsg('Applied successfully.');
    } catch (err) { setMsg('Application failed. Ensure you are logged in as a seeker.'); }
  }

  if (!job) return <div>Loading...</div>;
  return (
    <div>
      <h2>{job.title}</h2>
      <div>{job.employer?.company || job.employer?.name} • {job.location}</div>
      <p style={{whiteSpace:'pre-wrap'}}>{job.description}</p>
      <hr />
      <h3>Apply</h3>
      <form onSubmit={apply}>
        <textarea value={cover} onChange={e=>setCover(e.target.value)} placeholder="Cover letter" rows={4} style={{width:'100%'}} />
        <input type="file" onChange={e=>setResume(e.target.files?.[0])} />
        <button className="button" style={{marginTop:8}}>Apply</button>
      </form>
      {msg && <p>{msg}</p>}
    </div>
  )
}
