import axios from 'axios';

export const getCurrentUser = async () => {
  const token = localStorage.getItem('token');
  const res = await axios.get(`${process.env.REACT_APP_API_URL}/users/me`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};
