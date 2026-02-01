import { Button, Form, Input, Modal, Select, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import supabase from '../utils/supabase'

const Stock = () => {
  const [data, setData] = useState([])
  const [dataProduct, setDataProduct] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [selected, setSelected] = useState(null)
  const [form] = Form.useForm()

  /* ================= TABLE ================= */
  const columns = [
    {
      title: 'No',
      render: (_, __, index) => index + 1,
    },
    {
      title: 'Nama Sparepart',
      render: (row) => row.product?.nama_sparepart,
    },
    {
      title: 'Qty',
      dataIndex: 'qty',
    },
    {
      title: 'Type',
      render: (row) => (row.type ? 'Masuk' : 'Keluar'),
    },
    {
      title: 'Action',
      render: (row) => (
        <div className="flex gap-2">
          <Button onClick={() => handleEdit(row)}>Edit</Button>
          <Button danger onClick={() => handleDelete(row.id)}>
            Delete
          </Button>
        </div>
      ),
    },
  ]

  /* ================= FETCH ================= */
  const fetchHistory = async () => {
    const { data, error } = await supabase
      .from('history_products')
      .select(`
        *,
        product (
          id,
          nama_sparepart,
          stok
        )
      `)
      .order('created_at', { ascending: false })

    if (error) {
      console.error(error)
      return
    }
    setData(data)
  }

  const fetchProduct = async () => {
    const { data, error } = await supabase.from('product').select('*')
    if (error) {
      console.error(error)
      return
    }
    setDataProduct(data)
  }

  /* ================= CRUD ================= */
  const handleDelete = async (id) => {
    if (!confirm('Yakin hapus data ini?')) return
    await supabase.from('history_products').delete().eq('id', id)
    fetchHistory()
  }

  const handleSubmit = async (values) => {
    const { product_id, qty, type } = values
    const qtyNum = Number(qty)

    const product = dataProduct.find((p) => p.id === product_id)
    if (!product) return

    let newStok = type
      ? product.stok + qtyNum
      : product.stok - qtyNum

    if (isEdit) {
      await supabase
        .from('history_products')
        .update({ product_id, qty, type })
        .eq('id', selected.id)
    } else {
      await supabase.from('history_products').insert({
        product_id,
        qty,
        type,
      })
    }

    await supabase
      .from('product')
      .update({ stok: newStok })
      .eq('id', product_id)

    fetchHistory()
    form.resetFields()
    setIsOpen(false)
    setIsEdit(false)
    setSelected(null)
  }

  const handleEdit = (row) => {
    setIsEdit(true)
    setSelected(row)
    setIsOpen(true)

    form.setFieldsValue({
      product_id: row.product.id,
      qty: row.qty,
      type: row.type,
    })
  }

  /* ================= LIFECYCLE ================= */
  useEffect(() => {
    fetchHistory()
    fetchProduct()
  }, [])

  /* ================= UI ================= */
  return (
    <div>
      <div className="flex justify-between mb-4">
        <h1 className="text-lg font-semibold">Stock History Sparepart</h1>
        <Button onClick={() => setIsOpen(true)}>Tambah Stock</Button>
      </div>

      <Table rowKey="id" dataSource={data} columns={columns} />

      <Modal
        open={isOpen}
        onCancel={() => setIsOpen(false)}
        onOk={() => form.submit()}
      >
        <Form layout="vertical" form={form} onFinish={handleSubmit}>
          <Form.Item label="Nama Sparepart" name="product_id" required>
            <Select
              placeholder="Pilih sparepart"
              options={dataProduct.map((p) => ({
                value: p.id,
                label: p.nama_sparepart,
              }))}
            />
          </Form.Item>

          <Form.Item label="Qty" name="qty" required>
            <Input />
          </Form.Item>

          <Form.Item label="Type" name="type" required>
            <Select
              options={[
                { value: true, label: 'Masuk' },
                { value: false, label: 'Keluar' },
              ]}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default Stock
