import React from 'react';
import { Layout, Menu } from 'antd';
import { HomeOutlined, AppstoreOutlined, TeamOutlined, SettingOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Sider } = Layout;

const AppSidebar = ({ collapsed, onCollapse }) => {
  const menuItems = [
    { key: '1', icon: <HomeOutlined />, label: <Link to="/">Dashboard</Link> },
    { key: '2', icon: <AppstoreOutlined />, label: <Link to="/ticket">Projects</Link> },
    { key: '3', icon: <TeamOutlined />, label: <Link to="/team">Team</Link> },
    { key: '4', icon: <SettingOutlined />, label: <Link to="/settings">Settings</Link> },
  ];

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}
      style={{
        background: '#001529',
        boxShadow: '2px 0 8px rgba(0, 0, 0, 0.15)',
      }}
    >
      <div
        style={{
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          fontSize: '20px',
          fontWeight: 'bold',
          background: 'rgba(255, 255, 255, 0.1)',
          margin: '0 16px 16px 16px',
        }}
      >
        {collapsed ? 'D' : ' Dashboard'}
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['1']}
        items={menuItems}
        style={{ borderRight: 0 }}
      />
    </Sider>
  );
};

export default AppSidebar;