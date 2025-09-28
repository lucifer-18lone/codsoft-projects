
import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';

export default function Home(){
  const [featured, setFeatured] = useState([]);
  useEffect(()=>{ api.get('/jobs?limit=5').then(r=>setFeatured(r.data)).catch(()=>{}); }, []);
  return (
    <div>
      <section style={{marginBottom:24}}>
        <h2>Welcome to JobBoard Demo</h2>
        <p>Find jobs or post if you are an employer. <a href="#" className="button">Job Board FOR DEMO CLICK HERE</a></p>
      </section>
      <section>
        <h3>Featured Jobs</h3>
        {featured.map(j=> (
          <div key={j._id} className="job-card">
            <h4><Link to={`/jobs/${j._id}`}>{j.title}</Link></h4>
            <div>{j.employer?.company || j.employer?.name}</div>
            <div>{j.location} • {j.employmentType}</div>
          </div>
        ))}
      </section>
    </div>
  )
}
