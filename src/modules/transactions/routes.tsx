import { RouteObject } from 'react-router-dom';
import { TransactionPage } from './pages/TransactionPage';

export const transactionRoutes: RouteObject[] = [
  {
    path: '/transactions',
    element: <TransactionPage />,
  },
]; 