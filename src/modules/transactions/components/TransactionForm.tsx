import { Form, Input, InputNumber, DatePicker, Select, Button } from 'antd';
import dayjs from 'dayjs';
import type { Transaction } from '../../../types';
import { TransactionStatus } from '../../../enums';
import { useEffect } from 'react';

interface TransactionFormProps {
  initialValues?: Transaction | null;
  onSubmit: (values: Partial<Transaction>) => void;
}

interface FormValues {
  amount: number;
  date?: dayjs.Dayjs;
  category: string;
  status: string;
}

export const TransactionForm = ({ initialValues, onSubmit }: TransactionFormProps) => {
  const [form] = Form.useForm();

  const handleSubmit = (values: FormValues) => {
    const formattedValues = {
      ...values,
      date: values.date ? values.date.format('YYYY-MM-DD') : dayjs().format('YYYY-MM-DD'),
    };
    onSubmit(formattedValues);
    form.resetFields();
  };
  
  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({
        ...initialValues,
        date: initialValues.date ? dayjs(initialValues.date) : undefined,
      });
    } else {
      form.resetFields();
    }
  }, [initialValues, form]);

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
    >
      <Form.Item
        name="amount"
        label="Amount"
        rules={[{ required: true, message: 'Please input the amount!' }]}
      >
        <InputNumber
          style={{ width: '100%' }}
          prefix="$"
          step={0.01}
          precision={2}
        />
      </Form.Item>

      <Form.Item
        name="date"
        label="Date"
      >
        <DatePicker style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item
        name="category"
        label="Category"
        rules={[{ required: true, message: 'Please input the category!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="status"
        label="Status"
        rules={[{ required: true, message: 'Please select the status!' }]}
      >
        <Select>
          <Select.Option value={TransactionStatus.PENDING}>Pending</Select.Option>
          <Select.Option value={TransactionStatus.COMPLETED}>Completed</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          {initialValues ? 'Update' : 'Create'} Transaction
        </Button>
      </Form.Item>
    </Form>
  );
}; 