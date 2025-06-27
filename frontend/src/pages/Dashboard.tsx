

import React, { useEffect, useState } from 'react';
import {
  Box, Typography, Card, CardContent, Avatar, InputBase, Chip, Table,
  TableHead, TableRow, TableCell, TableBody, Select, MenuItem, TextField
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import PaidIcon from '@mui/icons-material/Paid';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import SavingsIcon from '@mui/icons-material/Savings';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid
} from 'recharts';
import { getTransactions } from '../services/transactions';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateRange } from '@mui/x-date-pickers-pro/models';
import dayjs, { Dayjs } from 'dayjs';
import { exportTransactionsToCSV } from '../utils/exportCSV';
import { exportTransactionsToPDF } from '../utils/exportPDF';
import {Menu} from '@mui/material';





const Dashboard: React.FC = () => {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [dateRange, setDateRange] = useState<DateRange<Dayjs>>([null, null]);

  useEffect(() => {
    (async () => {
      const data = await getTransactions();
      setTransactions(data);
    })();
  }, []);

const filtered = transactions.filter(t => {
    const match = t.user_id?.toLowerCase().includes(search.toLowerCase());
    const date = dayjs(t.date);
    const inRange =
      (!dateRange[0] || date.isAfter(dateRange[0].subtract(1, 'day')))
      && (!dateRange[1] || date.isBefore(dateRange[1].add(1, 'day')));
    return match && inRange;
  });

  const balance = transactions.reduce((acc, t) => acc + t.amount, 0);
  const statCards = [
    { title: 'Balance', icon: <AccountBalanceWalletIcon />, value: balance, color: '#00E676' },
    { title: 'Revenue', icon: <PaidIcon />, value: balance, color: '#00E676' },
    { title: 'Expenses', icon: <TrendingUpIcon />, value: balance, color: '#00E676' },
    { title: 'Savings', icon: <SavingsIcon />, value: balance, color: '#00E676' }
  ];

  const monthlyData = [
    { month: 'Jan', income: 400, expenses: 200 },
    { month: 'Feb', income: 900, expenses: 300 },
    { month: 'Mar', income: 100, expenses: 400 },
    { month: 'Apr', income: 600, expenses: 250 },
    { month: 'May', income: 800, expenses: 500 },
    { month: 'Jun', income: 500, expenses: 350 },
    { month: 'Jul', income: 224, expenses: 300 },
    { month: 'Aug', income: 300, expenses: 600 },
    { month: 'Sep', income: 950, expenses: 200 },
    { month: 'Oct', income: 400, expenses: 500 },
    { month: 'Nov', income: 200, expenses: 700 },
    { month: 'Dec', income: 600, expenses: 800 },
  ];
const weeklyData = [
  { month: 'Week 1', income: 200, expenses: 100 },
  { month: 'Week 2', income: 450, expenses: 200 },
  { month: 'Week 3', income: 300, expenses: 180 },
  { month: 'Week 4', income: 550, expenses: 220 },
];

const [chartRange, setChartRange] = useState<'monthly' | 'weekly'>('monthly');
const chartData = chartRange === 'monthly' ? monthlyData : weeklyData;
const [showAllTransactions, setShowAllTransactions] = useState(false);



 interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const income = payload.find((p: any) => p.dataKey === 'income');
    return (
      <Box
        sx={{
          backgroundColor: '#00E676',
          p: 1,
          borderRadius: 1,
          color: '#000',
          fontFamily: 'Poppins',
          fontSize: 13
        }}
      >
        Income<br />${income?.value}
      </Box>
    );
  }
  return null;
};

const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
const open = Boolean(anchorEl);

const handleClick = (event: React.MouseEvent<HTMLElement>) => {
  setAnchorEl(event.currentTarget);
};

const handleClose = () => {
  setAnchorEl(null);
};

  const handleDownload = (type: 'pdf' | 'csv') => {
  if (type === 'pdf') {
    exportTransactionsToPDF(filtered);
  } else if (type === 'csv') {
    exportTransactionsToCSV(filtered);
  }
  handleClose();
};


  const recent = transactions.map((t, i) => ({
  id: i,
  name: t.user_id,
  avatar: `https://i.pravatar.cc/150?img=${i + 10}`,
  date: new Date(t.date).toLocaleDateString(),
  amount: t.amount
}));


  return (
    <Box p={4} sx={{ bgcolor: 'rgba(40, 44, 53, 1);', color: '#fff', minHeight: '100vh', fontFamily: 'Poppins, sans-serif',paddingTop: '0px' }}>
     
<Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
        sx={{
          width: '105%',
          height: '74.94px',
          backgroundColor: 'rgba(26, 28, 34, 1)',
          px: 3,
          position: 'relative',
          left: '-2%',
          transform: 'rotate(0deg)',
        }}
      >
  <Typography
          sx={{
            fontFamily: 'Poppins',
            fontWeight: 600,
            fontSize: '19.98px',
            lineHeight: '100%',
            color: '#FFFFFF',
          }}
        >
          Dashboard
  </Typography>

        {/* Right Side - Search, Notification, Avatar */}
        <Box display="flex" alignItems="center" gap={2}>
          {/* Search Input */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#1F222A',
              borderRadius: '8px',
              px: 2,
              height: '36px',
              width: '200px'
            }}
          >
      <SearchIcon sx={{ color: '#888', fontSize: 20, mr: 1 }} />
            <InputBase
              placeholder="Search..."
              sx={{ color: '#fff', fontSize: '13px', flex: 1 }}
            />
          </Box>

    {/* Bell Icon */}
    <Box
            sx={{
              width: 36,
              height: 36,
              backgroundColor: '#1F222A',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
      <i className="fas fa-bell" style={{ color: '#fff', fontSize: '16px' }}></i>
    </Box>

    {/* Avatar */}
    <Avatar
            src="https://thispersondoesnotexist.com/"
            sx={{ width: 36, height: 36 }}
          />
  </Box>
</Box>


      <Box display="flex" gap={2} flexWrap="wrap" mb={4} >
        {statCards.map(c => (
          <Card key={c.title} sx={{  flex: '1 1 220px', borderRadius: 2,   background: '#1A1C22' }}>
            <CardContent>
              <Box display="flex" alignItems="center" gap={2}>
                <Box sx={{
                background: '#1A1C22;', p: 1.5, borderRadius: '25%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  {React.cloneElement(c.icon, { sx: { color: c.color, fontSize: 24 } })}
                </Box>
                <Box>
                  <Typography sx={{
                    fontFamily: 'Poppins',
                    fontWeight: 400,
                    fontSize: '11.66px',
                    lineHeight: '100%',
                    color: 'rgba(158, 158, 158, 1)'
                  }}>
                    {c.title}
                  </Typography>
                  <Typography sx={{
                    fontFamily: 'Poppins',
                    fontWeight: 500,
                    lineHeight: '100%',
                    letterSpacing: '0%',
                    verticalAlign: 'middle',
                    fontSize: '26.64px',
                    paddingTop: '12px',
                    color: '#FFFFFF'
                  }}>
                    ${c.value.toLocaleString()}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>

      <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={4} mb={4}>
  {/* Chart Card */}
  <Card sx={{ background: '#1A1C22', flex: 3, borderRadius: 2, p: 2 }}>
    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
      <Typography
        sx={{
          color: '#fff',
          fontFamily: 'Poppins',
          fontWeight: 600,
          fontSize: 16,
        }}
      >
        Overview
      </Typography>

      <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} gap={4} mb={4}>
        {/* Legend */}
        <Box display="flex" alignItems="center" gap={2}>
          <Box display="flex" alignItems="center" gap={1}>
            <Box width={10} height={10} borderRadius="50%" bgcolor="#00E676" />
            <Typography sx={{ color: '#bbb', fontSize: 13 }}>Income</Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={1}>
            <Box width={10} height={10} borderRadius="50%" bgcolor="#FF9100" />
            <Typography sx={{ color: '#bbb', fontSize: 13 }}>Expenses</Typography>
          </Box>
        </Box>

        {/* Dropdown */}
       <Select
  value={chartRange}
  onChange={(e) => setChartRange(e.target.value as 'monthly' | 'weekly')}
  size="small"
  variant="outlined"
  sx={{
    bgcolor: '#2B2D3C',
    color: '#fff',
    fontSize: 13,
    height: 30,
    '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
    '& svg': { color: '#fff' }
  }}
>
  <MenuItem value="monthly">Monthly</MenuItem>
  <MenuItem value="weekly">Weekly</MenuItem>
</Select>
      </Box>
    </Box>

    {/* Chart */}
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartData}>
        <XAxis
          dataKey="month"
          stroke="#888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(val) => `$${val}`}
        />
        <CartesianGrid stroke="transparent" />
        <Tooltip
          content={<CustomTooltip />}
          cursor={{ stroke: '#00E676', strokeDasharray: '4 4' }}
        />
        <Line
          type="monotone"
          dataKey="income"
          stroke="#00E676"
          strokeWidth={2.5}
          dot={{ r: 4 }}
          activeDot={{ r: 6 }}
        />
        <Line
          type="monotone"
          dataKey="expenses"
          stroke="#FF9100"
          strokeWidth={2.5}
          dot={{ r: 4 }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  </Card>

  {/* Recent Transactions */}
 <Card
  sx={{
    background: '#1A1C22',
    flex: 1,
    p: 2,
    borderRadius: 2,
    maxHeight: showAllTransactions ? 380 : 'auto',
    overflowY: showAllTransactions ? 'auto' : 'visible',
    '&::-webkit-scrollbar': {
      width: '6px'
    },
    '&::-webkit-scrollbar-track': {
      background: 'transparent'
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#444', // scroll thumb color
      borderRadius: '8px'
    },
    '&::-webkit-scrollbar-thumb:hover': {
      backgroundColor: '#666' // thumb color on hover
    },
    scrollbarColor: '#444 transparent', // for Firefox
    scrollbarWidth: 'thin'
  }}
>


    <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
      <Typography sx={{ fontFamily: 'Poppins', fontWeight: 600, color: '#fff', fontSize: 16 }}>
        Recent Transactions
      </Typography>
      <Typography
  sx={{ fontSize: 12, color: '#00E676', cursor: 'pointer' }}
  onClick={() => setShowAllTransactions(!showAllTransactions)}
>
  {showAllTransactions ? 'Show less' : 'See all'}
</Typography>

    </Box>

   {(showAllTransactions ? recent : recent.slice(0, 3)).map((r) => (
      <Box key={r.id} display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Box display="flex" alignItems="center" gap={1}>
          <Avatar src={r.avatar} />
          <Box>
            <Typography fontWeight={600} fontSize={14} sx={{ fontFamily: 'Poppins', color: '#fff' }}>
              {r.name}
            </Typography>
            <Typography fontSize={12} color="#aaa" sx={{ fontFamily: 'Poppins' }}>
              {r.date}
            </Typography>
          </Box>
        </Box>

        <Typography
          sx={{
            color: r.amount >= 0 ? '#00E676' : '#FF3D00',
            fontFamily: 'Poppins',
            fontSize: 14,
            fontWeight: 500
          }}
        >
          {r.amount >= 0 ? '+' : ''}${r.amount.toFixed(2)}
        </Typography>
      </Box>
    ))}
  </Card>
</Box>


      <Box sx={{ bgcolor: '#1A1C22', p: 3, borderRadius: 2 }}>
  {/* Header with search and date */}
   <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
    <Typography variant="h6" sx={{ color: '#fff', fontFamily: 'Poppins', fontWeight: 600 }}>
      Transactions
    </Typography>

    <Box display="flex" alignItems="center" gap={3}>
      {/* Search Input */}
      
       <Box display="flex" alignItems="center" borderRadius={2} sx={{ bgcolor: '#313543', px: 2, py: 0.5, width: 260 }}>
    <SearchIcon sx={{ color: '#8F9098', fontSize: 18, mr: 1 }} />
    <InputBase
      placeholder="Search for anything..."
      sx={{ color: '#C0C0C0', fontFamily: 'Poppins', fontSize: 14, width: '100%' }}
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  </Box>

      {/* Date Range */}
      <LocalizationProvider dateAdapter={AdapterDayjs}>
    <DateRangePicker
      value={dateRange}
      onChange={(newValue: DateRange<Dayjs>) => setDateRange(newValue)}
      calendars={1}
      localeText={{ start: '', end: '' }}
      sx={{ color: '#fff' }}
      slotProps={{ textField: { size: 'small' } }}
    />
  </LocalizationProvider>
 <Box
        onClick={handleClick}
        sx={{
          px: 2,
          py: 0.8,
          bgcolor: '#00E676',
          borderRadius: 2,
          cursor: 'pointer',
          fontFamily: 'Poppins',
          fontWeight: 700,
          fontSize: 13,
          color: '#fff',
          display: 'inline-block',
          '&:hover': {
            bgcolor: '#00c866'
          }
        }}
      >
        Download
      </Box>

     <Menu
  anchorEl={anchorEl}
  open={open}
  onClose={handleClose}
  anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
  transformOrigin={{ vertical: 'top', horizontal: 'left' }}
  PaperProps={{
    sx: {
      bgcolor: '#1A1C22',
      color: '#fff',
      borderRadius: 2,
      boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.3)',
      mt: 1,
      minWidth: 180,
      '& .MuiMenuItem-root': {
        fontFamily: 'Poppins',
        fontSize: 14,
        px: 2,
        py: 1.2,
        color: '#C0C0C0',
        '&:hover': {
          bgcolor: '#2B2D3C',
          color: '#00E676',
        },
      }
    }
  }}
>
  <MenuItem onClick={() => handleDownload('pdf')}>Download as PDF</MenuItem>
  <MenuItem onClick={() => handleDownload('csv')}>Download as CSV</MenuItem>
</Menu>


    </Box>
  </Box>

  {/* Table */}
  <Table sx={{ bgcolor: '#1E1E2F', borderRadius: 2 }}>
    <TableHead>
      <TableRow sx={{
      backgroundColor: '#282C35',
      width: '884.27px',
      height: 35,
      borderRadius: '20px',
    }}>
        {['Name', 'Date', 'Amount', 'Status'].map((col) => (
          <TableCell
            key={col}
            sx={{
              color: '#888',
          fontFamily: 'Poppins',
          fontWeight: 400,
          fontSize: 16,
          lineHeight: '100%',
          letterSpacing: 0,
          borderBottom: 'none',
            }}
          >
            {col}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>

    <TableBody>
      {filtered.map((row, idx) => (
        <TableRow
          key={idx}
          sx={{
            backgroundColor:'#1A1C22',
            '&:hover': { bgcolor: '#2A2D3E' },
            borderBottom: 'none',
          }}
        >
          {/* Name + Avatar */}
          <TableCell sx={{ padding: '12px 16px' }}>
            <Box display="flex" alignItems="center" gap={1.5}>
              <Avatar
                src={`https://i.pravatar.cc/150?img=${idx + 20}`}
                sx={{ width: 32, height: 32 }}
              />
              <Typography sx={{ fontFamily: 'Poppins', color: '#f0f0f0', fontSize: 14 }}>
                {row.user_id}
              </Typography>
            </Box>
          </TableCell>

          {/* Date */}
          <TableCell sx={{
    fontFamily: 'Poppins',
    fontWeight: 400,
    fontSize: 16,
    lineHeight: '100%',
    letterSpacing: 0,
    color: '#ccc',
  }}>
            {new Date(row.date).toLocaleDateString('en-GB', {
              weekday: 'short',
              day: '2-digit',
              month: 'short',
              year: 'numeric',
            })}
          </TableCell>

          {/* Amount */}
          <TableCell
            sx={{
              fontFamily: 'Poppins',
              color: row.amount >= 0 ? '#00E676' : '#FFB300',
              fontWeight: 500,
              fontSize: 14,
            }}
          >
            {row.amount >= 0 ? `+$${row.amount.toFixed(2)}` : `-$${Math.abs(row.amount).toFixed(2)}`}
          </TableCell>

          {/* Status Chip */}
   <TableCell>
  <Chip
    label={
      ['completed', 'paid'].includes(row.status?.toLowerCase())
        ? 'Completed'
        : 'Pending'
    }
    sx={{
      width: '93px',
      height: '25px',
    
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
        ? 'rgba(31, 203, 79, 0.1)'
        : 'rgba(255, 192, 30, 0.3)',
    }}
  />
</TableCell>



        </TableRow>
      ))}
    </TableBody>
  </Table>
</Box>

    </Box>
  );
};

export default Dashboard;
