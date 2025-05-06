import { useState } from 'react';
import type { MessageInstance } from 'antd/es/message/interface';

const API_URL = import.meta.env.VITE_API_URL;

export const useTransactionDelete = (messageApi: MessageInstance) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteTransaction = async (id: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${API_URL}/transactions/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete transaction');
      }

      messageApi.success('Transaction deleted successfully');
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      messageApi.error('Failed to delete transaction');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { deleteTransaction, loading, error };
}; 