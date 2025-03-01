import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosInstance from '../services/axiosInterceptor';

export const ParentsContext = createContext();

export const ParentsProvider = ({ children }) => {
  const [parentsData, setParentsData] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchParentses = async (page = 1) => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('token');
      const MasjidId = await AsyncStorage.getItem('id');
      if (!token) return;
      const response = await axiosInstance.post(
        '/Parent/GetAllParents',
        { 
          pageNumber: page, pageSize: 10,
          masjidId : MasjidId
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setParentsData(response.data.result.data);
      setPageNumber(page);
    } catch (error) {
      console.error('Error fetching Parentses:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchParentses();
  }, []);

  return (
    <ParentsContext.Provider value={{parentsData, fetchParentses, pageNumber, setPageNumber, loading }}>
      {children}
    </ParentsContext.Provider>
  );
};
