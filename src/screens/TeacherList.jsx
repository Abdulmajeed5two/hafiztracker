import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import axiosInstance from '../services/axiosInterceptor';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatList } from 'react-native-gesture-handler';

const TeacherList = ({ navigation }) => {
 const [teachersData, setTeachersData] = useState([]);

useEffect (() => {
  handleGetTeachers();
})
  
const handleGetTeachers = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    
    if (!token) {
      console.log('No token found');
      return;
    }
    const response = await axiosInstance.post(
      '/Teacher/GetAllTeachers',
      {
        pageNumber: 1,  
        pageSize: 10, 
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setTeachersData(response.data.result.data)
    console.log('Response Data:', response.data.result.data);

  } catch (error) {
    console.error('Error fetching data:', error);
  }
};


  return (
    <View style={styles.container}>
      <Header
        title="Teacher List"
        onMenuPress={() => console.log('Menu Pressed')}
        onNotifyPress={() => navigation.navigate('Notification')}
      />
      
      <ScrollView style={styles.tableContainer}>
        <View style={styles.tableHeader}>
          <Text style={styles.headerText}>Teacher Name</Text>
          <Text style={styles.headerText}>Masjid</Text>
          <Text style={styles.headerText}>Phone</Text>
        </View>

        <FlatList
          data={teachersData} 
          renderItem={({item}) => (
            <View style={styles.tableRow}>
              <Text style={styles.rowText}>{item.teacherName}</Text>
              <Text style={styles.rowText}>{item.masjidId}</Text>
              <Text style={styles.rowText}>{item.phone}</Text>
              </View>
              )}
          />
      </ScrollView>
    </View>
  );
};

export default TeacherList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  tableContainer: {
    padding: 16,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    flex: 1,
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  rowText: {
    fontSize: 14,
    color: '#333',
    flex: 1,
    textAlign: 'center',
  },
});