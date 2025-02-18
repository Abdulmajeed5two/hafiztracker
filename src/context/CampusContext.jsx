import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosInstance from '../services/axiosInterceptor';

export const CampusContext = createContext();

export const CampusProvider = ({ children }) => {
  const [campusData, setCampusData] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchCampuses = async (page = 1) => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('token');
      if (!token) return;

      const response = await axiosInstance.post(
        '/Campus/GetAllCampuss',
        { pageNumber: page, pageSize: 10 },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setCampusData(response.data.result.data);
      setPageNumber(page);
    } catch (error) {
      console.error('Error fetching campuses:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCampuses();
  }, []);

  return (
    <CampusContext.Provider value={{ campusData, fetchCampuses, pageNumber, setPageNumber, loading }}>
      {children}
    </CampusContext.Provider>
  );
};
