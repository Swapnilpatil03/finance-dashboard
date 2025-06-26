import axios from 'axios';

export const getTransactions = async () => {
  const token = localStorage.getItem('token');
  const { data } = await axios.get('http://localhost:5000/api/transactions', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  console.log('📦 Transactions received in frontend:', data); // Add this
  return data;
};
