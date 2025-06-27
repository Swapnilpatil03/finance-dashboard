import axios from 'axios';

const API = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const getTransactions = async (
  search = '',
  start = '',
  end = '',
  status = ''
) => {
  const token = localStorage.getItem('token');
  const params = new URLSearchParams();

  if (search) params.append('search', search);
  if (start) params.append('start', start);
  if (end) params.append('end', end);
  if (status) params.append('status', status); // ✅ Use this for unified filter

  const res = await axios.get(`${API}/transactions?${params.toString()}`, {
    headers: { Authorization: `Bearer ${token}` }
  });

  return res.data;
};
