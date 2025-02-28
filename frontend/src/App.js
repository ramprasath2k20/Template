import './App.css';
import 'antd/dist/reset.css'; // Import Ant Design CSS reset
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AppLayout from './pages/AppLayout';
import TicketList from './pages/List';

import Login from './Authentication/Login';

function ProtectedLayout() {
  return <AppLayout />; // Wrap all authenticated routes inside layout
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Login page without layout */}
        <Route path="/" element={<Login />} />

        {/* All other pages wrapped in layout */}
        <Route element={<ProtectedLayout />}>
          <Route path="/dashboard" element={<TicketList />} />
          
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
