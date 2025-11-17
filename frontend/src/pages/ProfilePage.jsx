import React from 'react';
import ApplyReferralForm from '../components/ApplyReferralForm';

export default function ProfilePage({ user, onUpdated }) {
  if (!user) return <div>Please register first.</div>;
  return (
    <div>
      <h2>Profile</h2>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Referral code:</strong> {user.referralCode}</p>
      <p><strong>Coins:</strong> {user.coins}</p>

      <h3>Apply a referral code</h3>
      <ApplyReferralForm user={user} onUpdated={onUpdated} />
    </div>
  );
}
