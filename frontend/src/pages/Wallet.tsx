import React, { useEffect, useState } from 'react';
import {
  Box, Typography, Card, CardContent, Avatar,
  Table, TableHead, TableRow, TableCell, TableBody
} from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import { getTransactions } from '../services/transactions';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const COLORS = ['#FF3D00', '#FF9100', '#FFC107', '#2979FF', '#00E676'];

const Wallet: React.FC = () => {
  const [transactions, setTransactions] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const data = await getTransactions();
      setTransactions(data);
    })();
  }, []);

  const income = transactions
    .filter(t => t.category?.toLowerCase() === 'revenue')
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const expenses = transactions
    .filter(t => t.category?.toLowerCase() === 'expense')
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const balance = income - expenses;

  // ✅ Category-wise Expense Breakdown
  const categoryBreakdown: Record<string, number> = {};
  transactions.forEach(t => {
    if (t.category?.toLowerCase() === 'expense') {
      const key = t.status || 'Unknown';
      categoryBreakdown[key] = (categoryBreakdown[key] || 0) + Number(t.amount);
    }
  });

  const pieData = Object.entries(categoryBreakdown).map(([name, value]) => ({ name, value }));

  return (
    <Box p={4} sx={{ bgcolor: '#1A1C22', color: 'white', minHeight: '100vh' }}>
      <Typography variant="h5" fontWeight={600} mb={3}>Wallet</Typography>

      {/* Balance Summary Cards */}
      <Box display="flex" gap={3} flexWrap="wrap" mb={4}>
        <Card sx={{ background: '#1E1E2F', color: '#fff', borderRadius: 2, flex: '1 1 200px' }}>
          <CardContent>
            <Box display="flex" alignItems="center" gap={2}>
              <AccountBalanceWalletIcon sx={{ color: '#00E676', fontSize: 32 }} />
              <Box>
                <Typography fontSize={14} color="#aaa">Total Balance</Typography>
                <Typography fontSize={24} fontWeight={600}>${balance.toFixed(2)}</Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>

        <Card sx={{ background: '#1E1E2F', color: '#fff', borderRadius: 2, flex: '1 1 200px' }}>
          <CardContent>
            <Box display="flex" alignItems="center" gap={2}>
              <TrendingDownIcon sx={{ color: '#FF3D00', fontSize: 32 }} />
              <Box>
                <Typography fontSize={14} color="#aaa">Total Expenses</Typography>
                <Typography fontSize={24} fontWeight={600}>${expenses.toFixed(2)}</Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>

      {/* Expense Category Breakdown Pie Chart */}
      <Card sx={{ bgcolor: '#1E1E2F', borderRadius: 2, p: 3, mb: 4 }}>
        <Typography variant="h6" mb={2}>Expense Breakdown by Status</Typography>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              dataKey="value"
              label={({ name }) => name}
            >
              {pieData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </Card>

      {/* Recent Transactions */}
       <Box>
        <Typography fontSize={18} fontWeight={600} mb={2}>Recent Wallet Activity</Typography>
        <Table sx={{ bgcolor: '#1E1E2F', borderRadius: 2 }}>
          <TableHead>
            <TableRow sx={{ bgcolor: '#282C35' }}>
              {['User', 'Date', 'Amount'].map((head) => (
                <TableCell key={head} sx={{ color: '#bbb', fontFamily: 'Poppins' }}>{head}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.slice(0, 5).map((t, i) => (
              <TableRow key={i} sx={{ '&:hover': { bgcolor: '#2A2D3E' } }}>
                <TableCell>
                  <Box display="flex" alignItems="center" gap={1.5}>
                    <Avatar src={`https://i.pravatar.cc/150?img=${i + 5}`} sx={{ width: 32, height: 32 }} />
                    <Typography fontFamily="Poppins">{t.user_id}</Typography>
                  </Box>
                </TableCell>
                <TableCell>{new Date(t.date).toLocaleDateString()}</TableCell>
                <TableCell sx={{ color: t.amount < 0 ? '#FF3D00' : '#00E676' }}>
                  {t.amount >= 0 ? `+$${t.amount}` : `-$${Math.abs(t.amount)}`}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Box>
  );
};

export default Wallet;
