
import React from 'react';
import { Link } from 'react-router-dom';
export default function JobCard({ job }){
  return (
    <div className="job-card">
      <h3><Link to={`/jobs/${job._id}`}>{job.title}</Link></h3>
      <div>{job.employer?.company || job.employer?.name}</div>
      <div>{job.location} • {job.employmentType}</div>
      <p>{job.description?.slice(0,160)}...</p>
    </div>
  )
}
