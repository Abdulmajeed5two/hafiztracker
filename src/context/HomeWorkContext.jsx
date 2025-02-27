import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosInstance from '../services/axiosInterceptor';

const HomeWorkContext = createContext();

export const HomeProvider = ({ children }) => {
    const [homeworkData, setHomeworkData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getHome = async (studentId) => {
        setLoading(true);
        setError(null);
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await axiosInstance.post(
                '/HomeWork/GetHomeWork',
                { studentId },
                {
                    headers: {
                        'Accept': '*/*',
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                }
            );
            const data = response.data.result.data;
            setHomeworkData(data);
        } catch (err) {
            console.error('Error fetching homework:', err);
            setError(err);
            setHomeworkData([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <HomeWorkContext.Provider value={{ homeworkData, getHome, loading, error }}>
            {children}
        </HomeWorkContext.Provider>
    );
};

export const useHome = () => useContext(HomeWorkContext);
