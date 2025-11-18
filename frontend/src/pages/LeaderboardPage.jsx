import React, { useEffect, useState } from "react";
import { getLeaderboard } from "../services/api";

function LeaderboardPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function load() {
      try {
        const res = await getLeaderboard();
        setUsers(res.users);
      } catch (err) {
        console.log("Leaderboard load error:", err);
      }
    }
    load();
  }, []);

  return (
    <div className="leaderboard">
      <h2>Leaderboard</h2>

      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Coins</th>
            <th>Referral Code</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u, index) => (
            <tr key={u._id}>
              <td>{index + 1}</td>
              <td>{u.name}</td>
              <td>{u.coins}</td>
              <td>{u.referralCode}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LeaderboardPage;
