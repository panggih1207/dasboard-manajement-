import React from 'react'
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const Home = () => {
  const data = [
    {
      key: 1,
      product: "Oli Mesin Federal",
      stock: 4
    },
    {
      key: 2,
      product: "Bearing 6201",
      stock: 4
    },
    {
      key: 3,
      product: "Bearing 6301",
      stock: 4
    },
    {
      key: 4,
      product: "Bearing 6300",
      stock: 10
    },
    {
      key: 5,
      product: "Seal Master Rem kvy",
      stock: 8
    },
    {
      key: 6,
      product: "Seal Master Rem ket",
      stock: 4
    },
    {
      key: 7,
      product: "Seal Kruk As kvb",
      stock: 3
    },
  ];

  return (
    <div className='p-5 w-full bg-blue-300/30 rounded-md' >
      <h2 className='text-lg font-semibold text-gray-600 mb-10' >Product</h2>
      <ResponsiveContainer width={'100%'} height={300}>
        <BarChart
          data={data}
        >
          <XAxis dataKey={'product'}/>
          <YAxis/>
          <Tooltip/>
          <Bar dataKey="stock" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default Home