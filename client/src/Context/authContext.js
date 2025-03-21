import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');
    const isAdmin = localStorage.getItem('isAdmin');
    return token ? { email, isAdmin, token } : null;
  });
  const navigate = useNavigate();

  // Kullanıcıyı giriş yaptıran işlev
  const login = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:8800/api/auth/login', { email, password });
      const { token, isAdmin } = response.data;

      // LocalStorage'e kullanıcı bilgilerini kaydet
      localStorage.setItem('email', email);
      localStorage.setItem('isAdmin', isAdmin);
      localStorage.setItem('token', token);

      // Kullanıcı bilgisini state'e set et
      setUser({ email, isAdmin, token });

      navigate('/admin'); // Başarılı giriş sonrası yönlendirme
    } catch (error) {
      console.error('Giriş hatası:', error);
      throw new Error('Giriş başarısız. Lütfen bilgilerinizi kontrol ediniz.');
    }
  };

  // Kullanıcıyı çıkış yaptıran işlev
  const logout = async () => {
    localStorage.removeItem('email');
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('token');
    setUser(null);
    await axios.post(
      "http://localhost:8800/api/auth/logout",
    );
    navigate('/login'); // Çıkış sonrası yönlendirme
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// useAuth hook'u kullanarak AuthContext'e erişim sağlama
export const useAuth = () => useContext(AuthContext);
