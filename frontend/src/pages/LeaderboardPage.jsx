import React, { useEffect, useState } from "react";
import { getLeaderboard } from "../services/api";

export default function LeaderboardPage() {
  const [leaders, setLeaders] = useState([]);     // ✅ MUST be empty array
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await getLeaderboard();
        setLeaders(data || []);                   // ensure array
      } catch (err) {
        console.error("Leaderboard load failed:", err);
        setLeaders([]);                           // fallback safety
      }
      setLoading(false);
    }
    load();
  }, []);

  if (loading) return <p>Loading leaderboard...</p>;

  return (
    <div className="leaderboard-card">
      <h2>🏆 Leaderboard</h2>

      {leaders.length === 0 ? (
        <p>No players yet.</p>
      ) : (
        leaders.map((user, i) => (
          <div key={i} className="leader-row">
            <span className="rank">{i + 1}</span>
            <span className="name">{user.name}</span>
            <span className="coins">{user.coins} coins</span>
          </div>
        ))
      )}
    </div>
  );
}
