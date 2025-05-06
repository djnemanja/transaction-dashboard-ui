import { useState, useEffect, useCallback } from 'react';
import { type Filters, type Transaction, ApiResponse } from '../types';

const API_URL = import.meta.env.VITE_API_URL;


export const useFetchTransactions = (filters: Filters, initialPage = 1, initialPageSize = 10) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [total, setTotal] = useState(0);

  const fetchTransactions = useCallback(async () => {
    try {
      setLoading(true);
      let url = `${API_URL}/transactions?page=${currentPage}&limit=${pageSize}`;
      if (filters.category) url += `&category=${filters.category}`;
      if (filters.status) url += `&status=${filters.status}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch transactions');
      }
      const data: ApiResponse = await response.json();
      setTransactions(data.transactions);
      setTotal(data.total);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [currentPage, pageSize, filters]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const refetch = () => {
    fetchTransactions();
  };

  return {
    transactions,
    loading,
    error,
    refetch,
    currentPage,
    pageSize,
    total,
    setCurrentPage,
    setPageSize,
  };
};
