import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "layouts/admin";
import { AdminLogin } from "views/admin/login/login";
import { Provider } from "react-redux";
import store from "store/Store";
import ProtectedRoute from "ProtectedRoute";
import {io} from 'socket.io-client'

export const socket=io("https://foodorder-8jma.onrender.com/",{
  auth:{
    token:localStorage.getItem('token')
  }
})

const App = () => {
  return (
    <Provider store={store}>
      <Routes>
        {localStorage.getItem('token') === null || localStorage.getItem('token') === undefined || localStorage.getItem('token') === '' ? (
          <Route path="/" element={<AdminLogin />} />
        ) : (
          <>
            <Route path="admin/*" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>} />
            <Route path="/" element={<Navigate to="/admin" replace />} />
          </>
        )}
      </Routes>

    </Provider>
  );
};

export default App;
