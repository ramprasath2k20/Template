import React from 'react';
import { Button, Dropdown, Avatar, Space,Menu } from 'antd';
import { MenuOutlined, UserOutlined, SettingOutlined, LogoutOutlined, DownOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
const AppHeader = ({ toggleCollapsed, collapsed }) => {
  const userMenu = (
    <Menu>
      <Menu.Item key="1" icon={<UserOutlined />}>
        Profile
      </Menu.Item>
      <Menu.Item key="2" icon={<SettingOutlined />}>
        Settings
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3" icon={<LogoutOutlined /> }
      >
        <Link to='/'></Link>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <div
      style={{
        padding: '0 24px',
        background: '#fff',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '64px',
      }}
    >
      <Button
        type="text"
        icon={<MenuOutlined />}
        onClick={toggleCollapsed}
        style={{ marginRight: 16 }}
      />
      
      <Space size="middle">
       
        <Dropdown overlay={userMenu}>
          <Space style={{ cursor: 'pointer' }}>
            <Avatar 
              size="large" 
              icon={<UserOutlined />}
              style={{ backgroundColor: '#1890ff' }}
            />
            <span>John Doe</span>
            <DownOutlined />
          </Space>
        </Dropdown>
      </Space>
    </div>
  );
};

export default AppHeader;