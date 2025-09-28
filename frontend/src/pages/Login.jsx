
import React, {useState} from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
export default function Login(){ const [form,setForm]=useState({email:'',password:''}); const nav=useNavigate();
  async function submit(e){ e.preventDefault(); try{ const res=await api.post('/auth/login', form); localStorage.setItem('token', res.data.token); alert('Logged in'); nav('/'); }catch(e){ alert('Login failed'); } }
  return (<div><h2>Login</h2><form onSubmit={submit}><input placeholder='Email' value={form.email} onChange={e=>setForm({...form,email:e.target.value})} /><input type='password' placeholder='Password' value={form.password} onChange={e=>setForm({...form,password:e.target.value})} /><button className='button'>Login</button></form></div>)
}
