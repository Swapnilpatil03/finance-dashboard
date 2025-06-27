import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import Sidebar from './components/Sidebar';
import type { JSX } from 'react';
import Transactions from './pages/Transactions';
import Wallet from './pages/Wallet';
import Analytics from './pages/Analytics';
import Profile from './pages/Profile';
// import Messages from './pages/Messages';
// import Settings from './pages/Settings';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const isLogin = location.pathname === '/login';
  return (
    <div style={{ display: 'flex' }}>
      {!isLogin && <Sidebar />}
      <main style={{ marginLeft: isLogin ? 0 : 250, flexGrow: 1 }}>{children}</main>
    </div>
  );
};

const PrivateRoute = ({ element }: { element: JSX.Element }) => {
  const token = localStorage.getItem('token');
  return token ? element : <Navigate to="/login" />;
};

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
          <Route path="*" element={<Navigate to="/dashboard" />} />
          <Route path="/transactions" element={<PrivateRoute element={<Transactions />} />} />
          <Route path="/wallet" element={<PrivateRoute element={<Wallet />} />} />
          <Route path="/analytics" element={<PrivateRoute element={<Analytics />} />} />
          <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />
          {/* <Route path="/messages" element={<PrivateRoute element={<Messages />} />} />
          <Route path="/settings" element={<PrivateRoute element={<Settings />} />} /> */}
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
