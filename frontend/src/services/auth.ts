import axios from 'axios';

const API = process.env.REACT_APP_API_URL;

export const login = async (email: string, password: string) => {
  const { data } = await axios.post(`${API}/auth/login`, { email, password });
  localStorage.setItem('token', data.token);
  return data;
};
