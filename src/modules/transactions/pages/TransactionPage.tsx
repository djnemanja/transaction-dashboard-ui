import { useState } from 'react';
import { useFetchTransactions } from '../../../hooks/useFetchTransactions';
import { useTransactionMutation } from '../../../hooks/useTransactionMutation';
import { useTransactionDelete } from '../../../hooks/useTransactionDelete';
import { TransactionTable } from '../components/TransactionTable';
import { Modal, Spin, message, Pagination } from 'antd';
import { TransactionForm } from '../components/TransactionForm';
import type { Transaction } from '../../../types';
export const TransactionPage = () => {
  const [filters, setFiltersState] = useState<{ category: string | null; status: string | null }>({
    category: null,
    status: null,
  });
  const { 
    transactions, 
    loading, 
    error, 
    refetch,
    currentPage,
    pageSize,
    total,
    setCurrentPage,
    setPageSize
  } = useFetchTransactions(filters);
  const [messageApi, contextHolder] = message.useMessage();
  const { mutate, loading: mutationLoading } = useTransactionMutation(messageApi);
  const { deleteTransaction, loading: deleteLoading } = useTransactionDelete(messageApi);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
  
  const setFilters = ({ type, value }: { type: 'category' | 'status'; value: string | null }) => {
    setFiltersState(prev => ({
      ...prev,
      [type]: value,
    }));
    setCurrentPage(1);
  };

  const categories = Array.from(new Set(transactions.map(t => t.category)));

  const handleAdd = () => {
    setSelectedTransaction(null);
    setIsModalOpen(true);
  };

  const handleEdit = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleDelete = async (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedTransaction) return;

    const success = await deleteTransaction(selectedTransaction.id);
    if (success) {
      refetch();
    }
    setIsDeleteModalOpen(false);
    setSelectedTransaction(null);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedTransaction(null);
  };

  const handleSubmit = async (values: Partial<Transaction>) => {
    const success = await mutate(
      values,
      !!selectedTransaction,
      selectedTransaction?.id
    );
    
    if (success) {
      refetch();
      handleModalClose();
    }
  };

  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

  return (
    <div className="p-4">
      {contextHolder}
      <h1 className="text-2xl font-bold mb-4">Transactions d</h1>
      
      {(loading || mutationLoading || deleteLoading) ? (
        <div className="flex justify-center items-center h-64">
          <Spin size="large" />
        </div>
      ) : (
        <>
          <TransactionTable 
            transactions={transactions} 
            onAdd={handleAdd}
            onEdit={handleEdit}
            onDelete={handleDelete}
            filters={filters}
            setFilters={setFilters}
            categories={categories}
          />
          <div className="mt-4 flex justify-end">
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={total}
              onChange={(page, size) => {
                setCurrentPage(page);
                setPageSize(size);
              }}
              showSizeChanger
              showQuickJumper
              showTotal={(total) => `Total ${total} items`}
            />
          </div>
        </>
      )}

      <Modal
        title={selectedTransaction ? 'Edit Transaction' : 'Add Transaction'}
        open={isModalOpen}
        onCancel={handleModalClose}
        footer={null}
      >
        <TransactionForm
          initialValues={selectedTransaction}
          onSubmit={handleSubmit}
        />
      </Modal>

      <Modal
        title="Delete Transaction"
        open={isDeleteModalOpen}
        onOk={handleDeleteConfirm}
        onCancel={() => setIsDeleteModalOpen(false)}
        okText="Yes"
        cancelText="No"
        okType="danger"
      >
        <p>Are you sure you want to delete this transaction?</p>
        <p>This action cannot be undone.</p>
      </Modal>
    </div>
  );
};
