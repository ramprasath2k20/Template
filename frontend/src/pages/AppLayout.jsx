// src/layout/AppLayout.js
import React from 'react';
import { useState } from 'react';
import {  Layout } from 'antd';
import AppHeader from '../components/Header/Header';
import AppFooter from '../components/Footer/Footer';
import AppSidebar from '../components/sidebar/Sidebar';
import { Outlet } from 'react-router-dom';

const { Content } = Layout;

const AppLayout = ({children}) => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  return (
    
    <Layout style={{ minHeight: '100vh' }}>
    <AppSidebar collapsed={collapsed} onCollapse={toggleCollapsed} />
    <Layout>
      <AppHeader toggleCollapsed={toggleCollapsed} collapsed={collapsed} />
      <Content
        style={{
          margin: '24px 16px',
          padding: 24,
          background: '#fff',
          minHeight: 280,
          borderRadius: '8px',
        }}
       
      >
        <div>
          <Outlet></Outlet>
        </div>
      </Content>
      <AppFooter />
    </Layout>
  </Layout>
  );
};

export default AppLayout;




// AppSidebar.jsx




