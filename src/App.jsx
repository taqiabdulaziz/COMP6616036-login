import React from 'react';
import Toast from 'react-bootstrap/Toast';

import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import HomePage from './pages/HomePage/HomePage';
import Login from './pages/Login/Login';
import ProtectedRoute from './components/ProtectedRoutes/ProtectedRoutes';
import Register from './pages/Register/Register';
import useSnackbarStore from './database/toastStore';
import ForgetPassword from './pages/ForgetPassword/ForgetPassword';

const queryClient = new QueryClient();

function App() {
  const { setShow, show, message } = useSnackbarStore(state => state);

  return (
    <QueryClientProvider client={queryClient}>
      <div style={{
        float: 'right',
        position: 'absolute'
      }}>
        <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
          <Toast.Header>
            <strong className="me-auto">Notification</strong>
          </Toast.Header>
          <Toast.Body>{message}</Toast.Body>
        </Toast>
      </div>
      <Router>
        <div className="menu">
          <Routes>
            <Route element={<ProtectedRoute />}>
              <Route exact path="/" element={<HomePage />} />
              <Route exact path="/forget" element={<ForgetPassword />} />
            </Route>
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
          </Routes>
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
