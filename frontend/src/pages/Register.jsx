
import React, {useState} from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
export default function Register(){ const [form,setForm]=useState({name:'',email:'',password:''}); const nav=useNavigate();
  async function submit(e){ e.preventDefault(); try{ const res=await api.post('/auth/register', form); localStorage.setItem('token', res.data.token); alert('Registered'); nav('/'); }catch(e){ alert('Register failed'); } }
  return (<div><h2>Register</h2><form onSubmit={submit}><input placeholder='Name' value={form.name} onChange={e=>setForm({...form,name:e.target.value})} /><input placeholder='Email' value={form.email} onChange={e=>setForm({...form,email:e.target.value})} /><input type='password' placeholder='Password' value={form.password} onChange={e=>setForm({...form,password:e.target.value})} /><button className='button'>Register</button></form></div>)
}
