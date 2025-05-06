import { RouteObject } from 'react-router-dom';
import { TransactionPage } from './pages/TransactionPage';
import { Navigate } from 'react-router-dom';

export const transactionRoutes: RouteObject[] = [
  {
    path: '/transactions',
    element: <TransactionPage />,
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]; 