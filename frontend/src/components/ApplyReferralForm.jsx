import React, { useState } from 'react';
import { applyReferral } from '../services/api';

export default function ApplyReferralForm({ user, onUpdated }) {
  const [code, setCode] = useState('');
  const [message, setMessage] = useState(null);
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);

  async function submit(e){
    e.preventDefault();
    setErr(null); setMessage(null); setLoading(true);
    try {
      const res = await applyReferral({ userId: user._id, code });
      setMessage(`Applied! You earned ${res.reward} coins. New balance: ${res.yourNewBalance}`);
      onUpdated && onUpdated(res);
    } catch (e) {
      setErr(e?.response?.data?.error || 'Failed to apply code');
    } finally { setLoading(false); }
  }

  return (
    <form onSubmit={submit}>
      <div>
        <label>Referral Code</label>
        <input value={code} onChange={e=>setCode(e.target.value)} required />
      </div>
      <button type="submit" disabled={loading}>Apply</button>
      {message && <div style={{color:'green'}}>{message}</div>}
      {err && <div style={{color:'red'}}>{err}</div>}
    </form>
  );
}
