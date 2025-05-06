import { createBrowserRouter, Navigate } from 'react-router-dom';
import { transactionRoutes } from './modules/transactions/routes';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/transactions" replace />,
  },
  ...transactionRoutes,
]); 