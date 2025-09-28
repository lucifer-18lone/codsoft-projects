
import React, { useEffect, useState } from 'react';
import api from '../services/api';

export default function CandidateDashboard(){
  const [apps, setApps] = useState([]);
  useEffect(()=>{ const id = localStorage.getItem('userId'); if (id) api.get(`/users/${id}/applications`).then(r=>setApps(r.data)).catch(()=>{}); }, []);
  return (
    <div>
      <h2>Candidate Dashboard</h2>
      <h3>Your Applications</h3>
      {apps.map(a => (
        <div key={a._id} className="job-card">
          <div>{a.job?.title}</div>
          <div>Status: {a.status}</div>
        </div>
      ))}
    </div>
  )
}
