import { Button, Table, Select, Space } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { Transaction, Filters } from '../../../types';
import { TransactionStatus } from '../../../enums';

interface TransactionTableProps {
  transactions: Transaction[];
  onAdd: () => void;
  onEdit: (transaction: Transaction) => void;
  onDelete: (transaction: Transaction) => void;
  filters: Filters;
  setFilters: (args: { type: 'category' | 'status'; value: string | null }) => void;
  categories: string[];
}

export const TransactionTable = ({ transactions, onAdd, onEdit, onDelete, filters, setFilters, categories }: TransactionTableProps) => {
  const columns: ColumnsType<Transaction> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount: number) => `$${amount}`,
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button type="link" onClick={() => onEdit(record)}>Edit</Button>
          <Button type="link" danger onClick={() => onDelete(record)}>Delete</Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex space-x-4">
          <Select
            placeholder="Filter by Category"
            style={{ width: 200 }}
            onChange={value => setFilters({ type: 'category', value })}
            allowClear
            value={filters.category}
          >
            {categories.map(category => (
              <Select.Option key={category} value={category}>
                {category}
              </Select.Option>
            ))}
          </Select>

          <Select
            placeholder="Filter by Status"
            style={{ width: 200 }}
            onChange={value => setFilters({ type: 'status', value })}
            allowClear
            value={filters.status}
          >
            <Select.Option value={TransactionStatus.PENDING}>Pending</Select.Option>
            <Select.Option value={TransactionStatus.COMPLETED}>Completed</Select.Option>
          </Select>
        </div>

        <Button type="primary" onClick={onAdd}>
          Add Transaction
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={transactions}
        rowKey="id"
        pagination={false}
      />
    </div>
  );
};
