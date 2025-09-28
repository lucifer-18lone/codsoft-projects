
import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Jobs from './pages/Jobs';
import JobDetail from './pages/JobDetail';
import EmployerDashboard from './pages/EmployerDashboard';
import CandidateDashboard from './pages/CandidateDashboard';
import Login from './pages/Login';
import Register from './pages/Register';

export default function App(){
  return (
    <div>
      <header className="header container">
        <h1><Link to="/">JobBoard Demo</Link></h1>
        <nav>
          <Link to="/jobs" style={{marginRight:12}}>Jobs</Link>
          <Link to="/employer">Employer</Link>
          <Link to="/candidate" style={{marginLeft:12}}>Candidate</Link>
          <Link to="/login" style={{marginLeft:12}}>Login</Link>
          <Link to="/register" style={{marginLeft:12}}>Register</Link>
        </nav>
      </header>
      <main className="container">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/jobs" element={<Jobs/>} />
          <Route path="/jobs/:id" element={<JobDetail/>} />
          <Route path="/employer" element={<EmployerDashboard/>} />
          <Route path="/candidate" element={<CandidateDashboard/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
        </Routes>
      </main>
    </div>
  )
}
