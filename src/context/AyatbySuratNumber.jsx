import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosInstance from '../services/axiosInterceptor';
import { SuratContext } from './SuratContext';

export const AyatBysuratnumberContext = createContext();

export const AyatBysuratnumberProvider = ({ children }) => {
  const { suratData } = useContext(SuratContext); // Get suratData from SuratContext
  const [ayatBysuratnumberData, setAyatBysuratnumberData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAyatBysuratnumberes = async (suratNumber) => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('token');
      if (!token) return;

      const response = await axiosInstance.post(
        `/Ayat/GetAyatBySuratId?suratnumber=${suratNumber}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setAyatBysuratnumberData(response.data.result.data);
      console.log('Fetched Ayat Data:', response.data.result.data);
    } catch (error) {
      console.error('Error fetching AyatBysuratnumberes:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (suratData && suratData.suratnumber) {
      fetchAyatBysuratnumberes(suratData.suratnumber); // Pass suratnumber to the function
    }
  }, [suratData]); // Re-run if suratData changes

  return (
    <AyatBysuratnumberContext.Provider value={{ ayatBysuratnumberData, loading }}>
      {children}
    </AyatBysuratnumberContext.Provider>
  );
};
