import { HomeOutlined, ProductOutlined, ProfileOutlined, StockOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [toggle, setToggle] = useState(false);

  const items = [
    {
      key: '/',
      icon: <HomeOutlined />,
      label: 'Home',
    },
    {
      key: '/product',
      icon: <ProductOutlined />,
      label: 'Product',
    },
    {
      key : '/stock',
      icon: <StockOutlined/>,
      label : 'Stock',
    },
    {
      key: '/profile',
      icon: <ProfileOutlined />,
      label: 'Profile',
    },
  ];

  return (
    <div
      className={`h-full bg-gray-800 p-5 flex flex-col items-center ${
        toggle ? 'w-20' : 'w-60'
      } transition-all duration-500`}
    >
      <h1
        onClick={() => setToggle(!toggle)}
        className="text-xl font-bold text-white mb-5 cursor-pointer"
      >
        {toggle ? 'PG' : 'Panjoel Garage'}
      </h1>

      <Menu
        items={items}
        mode="inline"
        className="w-full p-2"
        theme="dark"
        defaultSelectedKeys={'/'}
        selectedKeys={[location.pathname]}
        onClick={({ key }) => navigate(key)}
        inlineCollapsed={toggle}
      />
    </div>
  );
};

export default Sidebar;
