import React, { useEffect, useState } from 'react';
import {
  Box, Typography, ToggleButtonGroup, ToggleButton, Card, CardContent
} from '@mui/material';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, XAxis, YAxis, Legend, Bar } from 'recharts';
import { getTransactions } from '../services/transactions';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek'; 
dayjs.extend(isoWeek); 

const COLORS = ['#00E676', '#FF3D00', '#FFC107', '#2979FF', '#FF4081'];

const Analytics: React.FC = () => {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [range, setRange] = useState<'monthly' | 'weekly'>('monthly');

  useEffect(() => {
    (async () => {
      const data = await getTransactions();
      setTransactions(data);
    })();
  }, []);

  // Monthly and Weekly Grouping
  const groupByPeriod = (unit: 'month' | 'week') => {
    const grouped: Record<string, { income: number; expense: number }> = {};
    transactions.forEach((t) => {
      const key = dayjs(t.date).format(unit === 'month' ? 'MMM' : 'Wo');
      if (!grouped[key]) grouped[key] = { income: 0, expense: 0 };
      if (t.amount >= 0) grouped[key].income += Number(t.amount);
      else grouped[key].expense += Math.abs(Number(t.amount));
    });

    return Object.keys(grouped).map((label) => ({
      label,
      income: grouped[label].income,
      expense: grouped[label].expense
    }));
  };

  const chartData = range === 'monthly' ? groupByPeriod('month') : groupByPeriod('week');

  // Category-wise Expense Distribution
  const categoryExpenses: Record<string, number> = {};
 transactions.forEach(t => {
  if (t.category?.toLowerCase() === 'expense') {
    const category = t.category || 'Others';
    categoryExpenses[category] = (categoryExpenses[category] || 0) + Number(t.amount);
  }
});


  const pieData = Object.entries(categoryExpenses).map(([name, value]) => ({ name, value }));

  return (
    <Box p={4} sx={{ bgcolor: '#1A1C22', minHeight: '100vh', color: 'white' }}>
      <Typography variant="h5" fontWeight={600} mb={3}>Analytics Dashboard</Typography>

      {/* Toggle for range */}
      <ToggleButtonGroup
        color="primary"
        value={range}
        exclusive
        onChange={(e, newRange) => newRange && setRange(newRange)}
        sx={{ mb: 4 }}
      >
        <ToggleButton value="monthly" sx={{ color: 'white', borderColor: '#2B2D3C' }}>Monthly</ToggleButton>
        <ToggleButton value="weekly" sx={{ color: 'white', borderColor: '#2B2D3C' }}>Weekly</ToggleButton>
      </ToggleButtonGroup>

      {/* Income vs Expense Bar Chart */}
      <Card sx={{ bgcolor: '#1E1E2F', p: 2, mb: 4 }}>
        <Typography variant="subtitle1" mb={2}>Income vs Expenses ({range})</Typography>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <XAxis dataKey="label" stroke="#ccc" />
            <YAxis stroke="#ccc" />
            <Tooltip />
            <Legend />
            <Bar dataKey="income" fill="#00E676" name="Income" />
            <Bar dataKey="expense" fill="#FF3D00" name="Expense" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Pie Chart for Category-wise Expenses */}
      <Card sx={{ bgcolor: '#1E1E2F', p: 2 }}>
        <Typography variant="subtitle1" mb={2}>Category-wise Expense Distribution</Typography>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              label={({ name }) => name}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </Card>
    </Box>
  );
};

export default Analytics;
