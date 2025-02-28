// AppFooter.jsx
import React from 'react';
import { Space } from 'antd';

const AppFooter = () => {
  return (
    <div
      style={{
        textAlign: 'center',
        background: '#001529',
        color: '#fff',
        padding: '20px 50px',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          © 2025 xAI Corporation. All rights reserved.
        </div>
        <Space>
          <a href="#" style={{ color: '#fff', opacity: 0.65 }}>Privacy Policy</a>
          <a href="#" style={{ color: '#fff', opacity: 0.65 }}>Terms of Service</a>
          <a href="#" style={{ color: '#fff', opacity: 0.65 }}>Contact Us</a>
        </Space>
      </div>
    </div>
  );
};

export default AppFooter;