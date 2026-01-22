import { Table } from 'antd';
import React, { useEffect, useState } from 'react'
import supabase from '../utils/supabase';

const Product = () => {
  const [ data , setData] = useState([]);
  const columns = [
    {
    title: 'No',
    dataIndex: '',
    key: 'No',
    render : (_ , __ , index) => <p>{index + 1}</p>
  },
  {
    title: 'Nama Part',
    dataIndex: 'Nama_part',
    key: 'Nama_part',
  },
  
  {
    title: 'Harga',
    dataIndex: 'Harga',
    key: 'Harga',
  },
  
  {
    title: 'Stok',
    dataIndex: 'Stok',
    key: 'Stok',
  },
  {
    title: 'statu_Produk',
    dataIndex: 'statu_Produk',
    key: 'statu_Produk',
    render: (Status) => <p>{Status ? " Tersedia" : " Tidak Tersedia"}</p>
  },
];

 const fetchData =  async() => {
  const { data, error } = await supabase.from('Prodak').select('*');
   if(error){
    console.error(error.message)
   } else {
    setData(data)
   };
 }

  useEffect  (() => {
    fetchData()
   }
   , [])
  return (
    <div>
      <Table
         columns={columns}
          dataSource={data}
      />
    </div>
  )
}

export default Product