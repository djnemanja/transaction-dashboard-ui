export interface Filters {
  category: string | null;
  status: string | null;
}

export interface Transaction {
  id: string;
  amount: number;
  date: string;
  category: string;
  status: string;
}

export interface ApiResponse {
  transactions: Transaction[];
  total: number;
  page: number;
  limit: number;
}
