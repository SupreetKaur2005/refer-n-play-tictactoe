import React, { useState } from 'react';
import { register } from '../services/api';

export default function RegistrationForm({ onRegistered }) {
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState(null);

  async function submit(e){
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const { user } = await register({ name, email, password });
      onRegistered(user); // pass user up
    } catch (err) {
      setError(err?.response?.data?.error || 'Registration failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={submit} style={{maxWidth:360}}>
      <div>
        <label>Name</label><br/>
        <input value={name} onChange={e=>setName(e.target.value)} required/>
      </div>
      <div>
        <label>Email</label><br/>
        <input value={email} onChange={e=>setEmail(e.target.value)} required/>
      </div>
      <div>
        <label>Password</label><br/>
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} required/>
      </div>
      <button type="submit" disabled={loading}>{loading ? 'Registering...' : 'Register'}</button>
      {error && <div style={{color:'red'}}>{error}</div>}
    </form>
  );
}
