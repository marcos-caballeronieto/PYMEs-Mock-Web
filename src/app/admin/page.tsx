"use client";
import { useState } from 'react';
import LoginMock from './LoginMock';
import AdminDashboard from './AdminDashboard';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (!isAuthenticated) {
    return <LoginMock onLogin={() => setIsAuthenticated(true)} />;
  }

  return <AdminDashboard />;
}
