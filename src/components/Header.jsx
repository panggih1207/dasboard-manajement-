import { Dropdown } from 'antd'
import { SettingOutlined, UserOutlined } from '@ant-design/icons';
import React from 'react'
import { Label } from 'recharts'

const Header = () => {
    const items = [
        { key: 1 ,
            Label : "Profile",
            icon: <UserOutlined/>
        },
        { key: 2 ,
            Label : "keluar",
            icon : <SettingOutlined/>
        },
        
    ]
  return (
      <div className='w-full p-5 shadow-md bg-white flex items-center justify-between' >
        <h1 className='text-xl font-bold text-gray-700' >Ghania Dashboard</h1>
        <Dropdown menu={{ items }} placement='bottom' >
            <h1 className='hover:cursor-pointer' >
                Panjoel
            </h1>
        </Dropdown>
    </div>
  )
}

export default Header