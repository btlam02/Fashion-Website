import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false); // Khởi tạo trạng thái đăng nhập

  return (
    <AuthContext.Provider value={{ loggedIn, setLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

// Tạo hook để sử dụng trạng thái đăng nhập trong các component
export const useAuth = () => {
  return useContext(AuthContext);
};
