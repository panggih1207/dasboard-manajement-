import { Button, Table } from 'antd'
import React from 'react'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'


const Stock = () => {
    const dataStock = [
        { title : 'no' ,
            render : (_,__,i) => i+1,
          },
          { title : 'Nama Sparepart',
            dataIndex : 'nama_sparepart',
          },
          { title : 'Stock Sparepart',
            dataIndex : 'stock',
          },
          { title : 'Status Stock',
            dataIndex : 'status_stock',
          },
          { title : 'Action',
            render : (_,record) => (
                <>
                <Button>
                   <EditOutlined />
                </Button>
                 <Button
                     danger
                     className="ml-2" >
                     <DeleteOutlined/>
                 </Button>
                


                
                </>
            )
          },
    ]
    const dataSource = [
         { key : '1 ' , 
            nama_sparepart : 'oliMesin' ,
            stock : 24 ,
            status_stock : 'tersedia'


        },
        { key : '2' , 
            nama_sparepart : 'Busi' ,
            stock : 26 ,
            status_stock : 'tersedia'


        },
    ]

    
  return (
    <>
    
      <div className='flex justify-between items-center mb-5 py-1'    >
        <h1 className='text-xl font-bold ' >Data Stock Sparepart</h1>
      <Button type="primary" onClick={() => setOpen(true)}>
            Tambah Produk
          </Button>
    </div>
    <Table columns={dataStock} dataSource={dataSource} 
    className='mt-5'/>
    
    
    </>
  )
}

export default Stock