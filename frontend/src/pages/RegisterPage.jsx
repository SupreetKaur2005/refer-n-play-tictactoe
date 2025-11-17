import React, { useState } from 'react';
import RegistrationForm from '../components/RegistrationForm';

export default function RegisterPage({ onRegistered }) {
  const [user, setUser] = useState(null);

  function handleRegistered(u) {
    setUser(u);
    onRegistered && onRegistered(u);
  }

  return (
    <div>
      <h2>Create account</h2>
      {!user ? <RegistrationForm onRegistered={handleRegistered} /> :
        <div>
          <h3>Welcome, {user.name}</h3>
          <p><strong>Your referral code:</strong> {user.referralCode}</p>
          <p><strong>Coins:</strong> {user.coins}</p>
        </div>
      }
    </div>
  );
}
