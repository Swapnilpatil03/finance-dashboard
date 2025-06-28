import React, { useEffect, useState } from 'react';
import {
  Box, Typography, ToggleButtonGroup, ToggleButton, Card, MenuItem, Select, FormControl, InputLabel
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
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

  useEffect(() => {
    (async () => {
      const data = await getTransactions();
      setTransactions(data);
    })();
  }, []);

  const filteredTransactions = transactions.filter((t) => {
    const date = dayjs(t.date);
    const monthMatch = selectedMonth ? date.format('MMM') === selectedMonth : true;
    const yearMatch = selectedYear ? date.format('YYYY') === selectedYear : true;
    return monthMatch && yearMatch;
  });

  const groupByPeriod = (unit: 'month' | 'week') => {
    const grouped: Record<string, { income: number; expense: number }> = {};

    filteredTransactions.forEach((t) => {
      const date = dayjs(t.date);
      const key = unit === 'month' ? date.format('MMM') : date.format('Wo');

      if (!grouped[key]) grouped[key] = { income: 0, expense: 0 };

      if (t.category?.toLowerCase() === 'revenue') {
        grouped[key].income += Number(t.amount);
      } else if (t.category?.toLowerCase() === 'expense') {
        grouped[key].expense += Number(t.amount);
      }
    });

    return Object.entries(grouped).map(([label, values]) => ({
      label,
      income: values.income,
      expense: values.expense
    }));
  };

  const chartData = range === 'monthly' ? groupByPeriod('month') : groupByPeriod('week');

  const expenseStatusBreakdown: Record<string, number> = {};
  filteredTransactions.forEach(t => {
    if (t.category?.toLowerCase() === 'expense') {
      const status = (t.status || 'Unknown').toLowerCase();
      expenseStatusBreakdown[status] = (expenseStatusBreakdown[status] || 0) + Math.abs(Number(t.amount));
    }
  });

  const expenseStatusData = Object.entries(expenseStatusBreakdown).map(([name, value]) => ({ name, value }));

  const availableYears = Array.from(new Set(transactions.map(t => dayjs(t.date).format('YYYY'))));
  const availableMonths = Array.from(new Set(transactions.map(t => dayjs(t.date).format('MMM'))));

  return (
    <Box p={4} sx={{ bgcolor: '#1A1C22', minHeight: '100vh', color: 'white' }}>
      <Typography variant="h5" fontWeight={600} mb={3}>Analytics Dashboard</Typography>

      <Box display="flex" gap={2} mb={3} flexWrap="wrap">
        <FormControl sx={{ minWidth: 120 }} size="small">
          <InputLabel sx={{ color: 'white' }}>Year</InputLabel>
          <Select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            sx={{ color: 'white', borderColor: '#fff' }}
            label="Year"
          >
            <MenuItem value="">All</MenuItem>
            {availableYears.map((year) => <MenuItem key={year} value={year}>{year}</MenuItem>)}
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 120 }} size="small">
          <InputLabel sx={{ color: 'white' }}>Month</InputLabel>
          <Select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            sx={{ color: 'white', borderColor: '#fff' }}
            label="Month"
          >
            <MenuItem value="">All</MenuItem>
            {availableMonths.map((month) => <MenuItem key={month} value={month}>{month}</MenuItem>)}
          </Select>
        </FormControl>

        <ToggleButtonGroup
          color="primary"
          value={range}
          exclusive
          onChange={(e, newRange) => newRange && setRange(newRange)}
        >
          <ToggleButton value="monthly" sx={{ color: 'white', borderColor: '#2B2D3C' }}>Monthly</ToggleButton>
          <ToggleButton value="weekly" sx={{ color: 'white', borderColor: '#2B2D3C' }}>Weekly</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {/* Vertical Layout */}
      <Box display="flex" flexDirection="column" gap={4}>
        {/* Bar Chart: Revenue vs Expense */}
        <Card sx={{ bgcolor: '#1E1E2F', p: 2 }}>
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

        {/* Pie Chart: Expense Breakdown by Status */}
        <Card sx={{ bgcolor: '#1E1E2F', p: 2 }}>
          <Typography variant="subtitle1" mb={2}>Expense Breakdown by Status</Typography>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={expenseStatusData}
                cx="50%"
                cy="50%"
                label={({ name }) => name}
                outerRadius={100}
                dataKey="value"
              >
                {expenseStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </Box>
    </Box>
  );
};

export default Analytics;
