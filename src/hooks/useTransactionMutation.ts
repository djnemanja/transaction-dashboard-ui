import { useState } from 'react';
import type { Transaction } from '../types';
import type { MessageInstance } from 'antd/es/message/interface';

const API_URL = import.meta.env.VITE_API_URL;

export const useTransactionMutation = (messageApi: MessageInstance) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutate = async (values: Partial<Transaction>, isEdit: boolean, id?: string) => {
    try {
      setLoading(true);
      setError(null);

      const url = isEdit 
        ? `${API_URL}/transactions/${id}`
        : `${API_URL}/transactions`;
      
      const method = isEdit ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error('Failed to save transaction');
      }

      messageApi.success(`Transaction ${isEdit ? 'updated' : 'created'} successfully`);
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      messageApi.error('Failed to save transaction');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { mutate, loading, error };
}; 