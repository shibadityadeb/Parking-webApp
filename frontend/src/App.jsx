import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute, RoleRoute } from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Drivers from './pages/Drivers';
import Cars from './pages/Cars';
import History from './pages/History';
import AdminDashboard from './pages/AdminDashboard';
import './styles/theme.css';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Routes - Require Authentication */}
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />

          {/* Manager Routes - Only MANAGER role */}
          <Route
            path="/drivers"
            element={
              <RoleRoute allowedRoles={['MANAGER']}>
                <Drivers />
              </RoleRoute>
            }
          />

          <Route
            path="/cars"
            element={
              <RoleRoute allowedRoles={['MANAGER']}>
                <Cars />
              </RoleRoute>
            }
          />

          <Route
            path="/history"
            element={
              <RoleRoute allowedRoles={['MANAGER']}>
                <History />
              </RoleRoute>
            }
          />

          {/* Admin Routes - Only ADMIN role */}
          <Route
            path="/admin"
            element={
              <RoleRoute allowedRoles={['ADMIN']}>
                <AdminDashboard />
              </RoleRoute>
            }
          />

          {/* Default route - Redirect to login */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* Catch-all - Redirect to login */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
