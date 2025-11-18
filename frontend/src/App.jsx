import React, { useState } from 'react';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import PlayPage from './pages/PlayPage';
import LeaderboardPage from './pages/LeaderboardPage';
import { awardWin as sendWinReward } from "./services/api";

export default function App() {
  const [user, setUser] = useState(null);

  // On registration
  function handleRegistered(u) {
    setUser(u);
  }

  // On referral update
  function handleReferralUpdated(res) {
    setUser(prev => ({
      ...prev,
      coins: res.yourNewBalance,
      referredBy: prev?.referredBy || res.referrer
    }));
  }

  // When user wins a game
  async function awardWin() {
    if (!user?._id) return;

    try {
      const res = await sendWinReward({ userId: user._id });
      setUser(prev => prev ? { ...prev, coins: res.newBalance } : prev);
    } catch (err) {
      console.log("Win reward failed:", err);
    }
  }

  return (
    <div className="app-wrapper">
      <h1 className="title">Refer & Earn — TicTacToe Demo</h1>

      <div className="layout">
        {/* LEFT SIDE */}
        <div className="left-card">
          <RegisterPage onRegistered={handleRegistered} />
          <ProfilePage user={user} onUpdated={handleReferralUpdated} />

          <div className="leader-card">
            <LeaderboardPage />
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="right-card">
          <PlayPage user={user} onWinReward={awardWin} />
        </div>
      </div>
    </div>
  );
}

