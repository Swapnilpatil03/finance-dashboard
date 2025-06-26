import axios from 'axios';

export const login = async (email: string, password: string) => {
  const { data } = await axios.post('http://localhost:5000/api/auth/login', { email, password });
  localStorage.setItem('token', data.token);
  return data;
};
