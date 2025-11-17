import React, { useState } from 'react';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import PlayPage from './pages/PlayPage';
import { applyReferral } from './services/api';
import axios from 'axios';
import { awardWin as sendWinReward } from "./services/api";

export default function App(){
  const [user, setUser] = useState(null);

  // on registration, store user in state
  function handleRegistered(u) {
    setUser(u);
  }

  // when referral applied, backend returns new balances.
  function handleReferralUpdated(res) {
    // update local user coins
    setUser(prev => ({ ...prev, coins: res.yourNewBalance, referredBy: prev.referredBy || res.referrer }));
  }

async function awardWin() {
  if (!user?._id) return;

  try {
    const res = await sendWinReward({ userId: user._id });
    setUser(prev => prev ? ({ ...prev, coins: res.newBalance }) : prev);

  } catch (err) {
    console.log("Win reward failed:", err);
  }
}


  return (
    <div style={{padding:20}}>
      <h1>Refer & Earn — TicTacToe Demo</h1>
      <div style={{display:'flex', gap:40}}>
        <div style={{flex:1}}>
          <RegisterPage onRegistered={handleRegistered} />
          <ProfilePage user={user} onUpdated={handleReferralUpdated} />
        </div>
        <div style={{flex:1}}>
          <PlayPage user={user} onWinReward={awardWin} />
        </div>
      </div>
    </div>
  );
}
