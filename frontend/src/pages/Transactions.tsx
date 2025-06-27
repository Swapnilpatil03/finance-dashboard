import React, { useEffect, useState } from 'react';

import {
  Box, Typography, InputBase, Table, TableHead, TableRow,
  TableCell, TableBody, Chip, Avatar
} from '@mui/material';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import SearchIcon from '@mui/icons-material/Search';
import { DateRange } from '@mui/x-date-pickers-pro/models';
import dayjs, { Dayjs } from 'dayjs';
import { getTransactions } from '../services/transactions';
import { exportTransactionsToCSV } from '../utils/exportCSV';
import { exportTransactionsToPDF } from '../utils/exportPDF';
import DownloadIcon from '@mui/icons-material/Download';

const Transactions: React.FC = () => {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [dateRange, setDateRange] = useState<DateRange<Dayjs>>([null, null]);
const [statusFilter, setStatusFilter] = useState<'all' | 'completed' | 'pending'>('all');
 useEffect(() => {
  const fetchData = async () => {
    let endpoint = '/transactions';
    if (statusFilter === 'completed') endpoint = '/transactions/completed';
    else if (statusFilter === 'pending') endpoint = '/transactions/pending';

    const start = dateRange[0]?.toISOString();
    const end = dateRange[1]?.toISOString();
    const data = await getTransactions(search, start, end); // ✅ now matches expected params

    setTransactions(data);
  };
  fetchData();
}, [search, dateRange, statusFilter]);



  const filtered = transactions.filter((t) => {
  const match = t.user_id?.toLowerCase().includes(search.toLowerCase());
  const date = dayjs(t.date);
  const inRange =
    (!dateRange[0] || date.isAfter(dateRange[0].subtract(1, 'day'))) &&
    (!dateRange[1] || date.isBefore(dateRange[1].add(1, 'day')));
  const status = t.status?.toLowerCase();
  const matchStatus =
    statusFilter === 'all' ||
    (statusFilter === 'completed' && ['completed', 'paid'].includes(status)) ||
    (statusFilter === 'pending' && status === 'pending');
  return match && inRange && matchStatus;
});


  return (
    <Box p={4} sx={{ bgcolor: '#1A1C22', color: 'white', minHeight: '100vh' }}>
      <Box mb={3} display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h5" fontWeight={600}>Transactions</Typography>

        <Box display="flex" gap={2} alignItems="center">
          <Box display="flex" alignItems="center" bgcolor="#2B2D3C" px={2} borderRadius={2}>
            <SearchIcon sx={{ color: '#ccc', mr: 1 }} />
            <InputBase
              placeholder="Search by user ID"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{ color: '#fff' }}
            />
          </Box>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateRangePicker
              value={dateRange}
              onChange={(val) => setDateRange(val)}
              localeText={{ start: '', end: '' }}
              slotProps={{ textField: { size: 'small' } }}
            />
          </LocalizationProvider>

          <Box display="flex" gap={1}>
            <Box
              onClick={() => exportTransactionsToCSV(filtered)}
              sx={{
                px: 2,
                py: 1,
                bgcolor: '#00E676',
                borderRadius: 2,
                cursor: 'pointer',
                fontFamily: 'Poppins',
                fontWeight: 600,
                fontSize: 13,
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                '&:hover': {
                  bgcolor: '#00c866'
                }
              }}
            >
              <DownloadIcon sx={{ fontSize: 18 }} /> CSV
            </Box>

            <Box
              onClick={() => exportTransactionsToPDF(filtered)}
              sx={{
                px: 2,
                py: 1,
                bgcolor: '#007F5F',
                borderRadius: 2,
                cursor: 'pointer',
                fontFamily: 'Poppins',
                fontWeight: 600,
                fontSize: 13,
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                '&:hover': {
                  bgcolor: '#005F46'
                }
              }}
            >
              <DownloadIcon sx={{ fontSize: 18 }} /> PDF
            </Box>
          </Box>
        </Box>
      </Box>
<Box display="flex" gap={2} mb={2}>
  {['all', 'completed', 'pending'].map((status) => (
    <Box
      key={status}
      onClick={() => setStatusFilter(status as 'all' | 'completed' | 'pending')}
      sx={{
        px: 2,
        py: 0.7,
        borderRadius: '10px',
        fontFamily: 'Poppins',
        fontWeight: 500,
        fontSize: '12px',
        lineHeight: '100%',
        letterSpacing: '0%',
        cursor: 'pointer',
        width: '93px',
        height: '25px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color:
          status === 'completed'
            ? 'rgba(31, 203, 79, 1)'
            : status === 'pending'
            ? 'rgba(255, 192, 30, 1)'
            : '#fff',
        
        bgcolor:
          status === statusFilter
            ? status === 'completed'
              ? 'rgba(31, 203, 79, 0.1)'
              : status === 'pending'
              ? 'rgba(255, 192, 30, 0.3)'
              : '#2B2D3C'
            : 'transparent',
       border: status === statusFilter ? 'none' : '1px solid #2B2D3C',
'&:hover': {
  bgcolor:
    status === 'completed'
      ? 'rgba(31, 203, 79, 0.2)'     // light green hover
      : status === 'pending'
      ? 'rgba(255, 192, 30, 0.4)'    // light yellow hover
      : '#2A2D3E'
}

      }}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Box>
  ))}
</Box>

      <Table sx={{ bgcolor: '#1E1E2F', borderRadius: 2 }}>
        <TableHead>
          <TableRow sx={{ backgroundColor: '#282C35' }}>
            {['Name', 'Date', 'Amount', 'Status'].map((head) => (
              <TableCell key={head} sx={{ color: '#bbb', fontFamily: 'Poppins' }}>
                {head}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {filtered.map((row, i) => (
            <TableRow
              key={i}
              sx={{ backgroundColor: '#1A1C22', '&:hover': { bgcolor: '#2A2D3E' } }}
            >
              <TableCell>
                <Box display="flex" alignItems="center" gap={1.5}>
                  <Avatar src={`https://i.pravatar.cc/150?img=${i + 10}`} sx={{ width: 32, height: 32 }} />
                  <Typography fontFamily="Poppins" fontSize={14}>{row.user_id}</Typography>
                </Box>
              </TableCell>
              <TableCell>
                {new Date(row.date).toLocaleDateString('en-GB', {
                  weekday: 'short',
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric'
                })}
              </TableCell>
              <TableCell sx={{ color: row.status == "Pending" ?'#FFC01E' : '#00E676' }}>
                {row.amount >= 0 ? `+$${row.amount.toFixed(2)}` : `-$${Math.abs(row.amount).toFixed(2)}`}
              </TableCell>
              <TableCell>
                <Chip
  label={
    ['completed', 'paid'].includes(row.status?.toLowerCase())
      ? 'Completed'
      : 'Pending'
  }
  sx={{
    width: '93px',
    height: '23px',
    borderRadius: '10px',
    fontFamily: 'Poppins',
    fontWeight: 500,
    fontSize: '12px',
    lineHeight: '100%',
    letterSpacing: '0%',
    textTransform: 'none',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: ['completed', 'paid'].includes(row.status?.toLowerCase())
      ? 'rgba(31, 203, 79, 1)'
      : 'rgba(255, 192, 30, 1)',
    bgcolor: ['completed', 'paid'].includes(row.status?.toLowerCase())
      ? 'rgba(31, 203, 79, 0.1)' // light green body
      : 'rgba(255, 192, 30, 0.3)', // light yellow body
  }}
/>

              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default Transactions;
