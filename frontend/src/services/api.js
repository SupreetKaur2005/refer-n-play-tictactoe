import axios from 'axios';

const API = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Register user
export const register = (payload) =>
    axios.post(`${API}/register`, payload).then(r => r.data);

// Apply referral
export const applyReferral = (payload) =>
    axios.post(`${API}/apply-referral`, payload).then(r => r.data);

// Get user (only if backend supports it)
export const getUser = (userId) =>
    axios.get(`${API}/user/${userId}`).then(r => r.data);

// Award win coins
export const awardWin = (payload) =>
    axios.post(`${API}/win`, payload).then(r => r.data);

// ✅ GET leaderboard — REQUIRED for your UI
export const getLeaderboard = () =>
    axios.get(`${API}/leaderboard`).then(r => r.data);