import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosInstance from '../services/axiosInterceptor';

export const MasjidContext = createContext();

export const MasjidProvider = ({ children }) => {
  const [masjidData, setMasjidData] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true); // To track if more data is available

  const fetchMasjides = async () => {
    if (!hasMore || loading) return; // Prevent multiple calls if no more data

    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('token');
      if (!token) return;

      const response = await axiosInstance.post(
        '/Masjid/GetAllMasjids',
        { pageNumber, pageSize: 10 },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.result.data.length === 0) {
        setHasMore(false); // No more data to load
      } else {
        setMasjidData(prevData => [...prevData, ...response.data.result.data]);
        setPageNumber(prevPage => prevPage + 1); // Auto-increment page number
      }
    } catch (error) {
      console.error('Error fetching Masjids:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMasjides();
  }, []);

  return (
    <MasjidContext.Provider value={{ masjidData, fetchMasjides, loading, hasMore }}>
      {children}
    </MasjidContext.Provider>
  );
};
