import { useUser } from './pages/UserContext';
import { Navigate, Outlet } from 'react-router-dom';
import { LoadingOverlay } from '@mantine/core';

export default function RequireAuth() {
  const { isAuthenticated, loading } = useUser();
  if (loading) {return <LoadingOverlay visible />;}
  return isAuthenticated ? <Outlet /> : <Navigate to="/auth" replace />;
}
