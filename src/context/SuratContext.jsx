import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosInstance from '../services/axiosInterceptor';

export const SuratContext = createContext();

export const SuratProvider = ({ children }) => {
  const [suratData, setSuratData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchSurates = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('token');
      if (!token) return;

      const response = await axiosInstance.get(
        '/Surat',
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSuratData(response.data.result.data);
    } catch (error) {
      console.error('Error fetching Surates:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSurates();
  }, []);

  return (
    <SuratContext.Provider value={{ suratData, loading }}>
      {children}
    </SuratContext.Provider>
  );
};
