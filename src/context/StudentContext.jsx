import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosInstance from '../services/axiosInterceptor';

export const StudentContext = createContext();

export const StudentProvider = ({ children }) => {
  const [studentData, setStudentData] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchStudentes = async (page = 1) => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('token');
      if (!token) return;

      const response = await axiosInstance.post(
        '/Student/GetAllStudents',
        { pageNumber: page, pageSize: 10 },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setStudentData(response.data.result.data);
      setPageNumber(page);
    } catch (error) {
      console.error('Error fetching Studentes:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudentes();
  }, []);

  return (
    <StudentContext.Provider value={{ studentData, fetchStudentes, pageNumber, setPageNumber, loading }}>
      {children}
    </StudentContext.Provider>
  );
};
