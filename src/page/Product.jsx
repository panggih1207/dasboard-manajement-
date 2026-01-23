import { Button, Form, Input, InputNumber, Modal, Select, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { supabase } from '../utils/supabase';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

const Product = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form] = Form.useForm();

  const fetchData = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('product')
      .select('*')
      .order('id', { ascending: true });

    if (error) {
      console.error(error);
    } else {
      setData(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (values) => {
    const payload = {
      nama_sparepart: values.nama_sparepart,
      harga: values.harga,
      stok: values.stok,
      status_produk: values.status_produk,
    };

    let error;

    if (editingId) {
      ({ error } = await supabase
        .from('product')
        .update(payload)
        .eq('id', editingId));
    } else {
      ({ error } = await supabase
        .from('product')
        .insert(payload));
    }

    if (error) {
      console.error(error);
      return;
    }

    setOpen(false);
    setEditingId(null);
    form.resetFields();
    fetchData();
  };

  const handleEdit = (record) => {
    setEditingId(record.id);
    setOpen(true);
    form.setFieldsValue(record);
  };

  const handleDelete = async (id) => {
    if (!confirm('Yakin hapus produk?')) return;

    const { error } = await supabase
      .from('product')
      .delete()
      .eq('id', id);

    if (error) {
      console.error(error);
    } else {
      fetchData();
    }
  };

  const columns = [
    {
      title: 'No',
      render: (_, __, i) => i + 1,
    },
    {
      title: 'Nama',
      dataIndex: 'nama_sparepart',
    },
    {
      title: 'Harga',
      dataIndex: 'harga',
    },
    {
      title: 'Stok',
      dataIndex: 'stok',
    },
    {
      title: 'Status',
      dataIndex: 'status_produk',
      render: (v) => (v ? 'Tersedia' : 'Tidak'),
    },
    {
      title: 'Action',
      render: (_, record) => (
        <>
          <Button onClick={() => handleEdit(record)} type="primary">
            <EditOutlined />
          </Button>
          <Button
            danger
            className="ml-2"
            onClick={() => handleDelete(record.id)}
          >
            <DeleteOutlined />
          </Button>
        </>
      ),
    },
  ];

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        Tambah Produk
      </Button>

      <Table
        className="mt-4"
        rowKey="id"
        loading={loading}
        dataSource={data}
        columns={columns}
      />

      <Modal
        open={open}
        onCancel={() => setOpen(false)}
        onOk={() => form.submit()}
        title="Form Product"
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="nama_sparepart"
            label="Nama Product"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="harga"
            label="Harga"
            rules={[{ required: true }]}
          >
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            name="stok"
            label="Stok"
            rules={[{ required: true }]}
          >
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            name="status_produk"
            label="Status"
            rules={[{ required: true }]}
          >
            <Select>
              <Select.Option value={true}>Tersedia</Select.Option>
              <Select.Option value={false}>Tidak</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Product;
