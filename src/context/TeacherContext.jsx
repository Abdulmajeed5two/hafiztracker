import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosInstance from '../services/axiosInterceptor';

export const TeacherContext = createContext();

export const TeacherProvider = ({ children }) => {
  const [teacherData, setTeacherData] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchTeacheres = async (page = 1) => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('token');
      const MasjidId = await AsyncStorage.getItem('id');
      if (!token) return;

      const response = await axiosInstance.post(
        '/Teacher/GetAllTeachers',
        { 
          pageNumber: page, pageSize: 10,
          masjidId : MasjidId

        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setTeacherData(response.data.result.data);
      setPageNumber(page);
    } catch (error) {
      console.error('Error fetching Teacheres:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeacheres();
  }, []);

  return (
    <TeacherContext.Provider value={{ teacherData, fetchTeacheres, pageNumber, setPageNumber, loading }}>
      {children}
    </TeacherContext.Provider>
  );
};
