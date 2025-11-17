import axios from 'axios';
const API = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const register = (payload) => axios.post(`${API}/register`, payload).then(r => r.data);
export const applyReferral = (payload) => axios.post(`${API}/apply-referral`, payload).then(r => r.data);
export const getUser = (userId) => axios.get(`${API}/user/${userId}`).then(r => r.data); // optional if implemented laterexport const awardWin = (payload) =>

export const awardWin = (payload) =>
    axios.post(`${API}/win`, payload).then(r => r.data);