import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import React, { useContext, useState } from 'react';
import icons from '../../constant/Icons';
import { FlatList } from 'react-native-gesture-handler';
import { width } from '../../constant/Size';
import { colors } from '../../constant/Colors';
import { StudentContext } from '../../context/StudentContext';
import Appbar from '../../components/Appbar';
import axiosInstance from '../../services/axiosInterceptor';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

const SelectStudents = ({navigation, route}) => {
    const { teacherId } = route.params; // Get teacher ID from navigatio
  const { studentData, fetchStudentes, pageNumber, loading } = useContext(StudentContext);
  const [selectedStudents, setSelectedStudents] = useState([]);

  const toggleStudentSelection = (studentId) => {
    setSelectedStudents((prevSelected) =>
      prevSelected.includes(studentId)
        ? prevSelected.filter((id) => id !== studentId)
        : [...prevSelected, studentId] 
    );
  };

  const AssignStudents = async () => {
    if (selectedStudents.length === 0) {
      alert('Please select at least one student.');
      return;
    }
  
    try {
      const masjidId = await AsyncStorage.getItem('id');
      const token = await AsyncStorage.getItem('token');
  
      const requestBody = selectedStudents.map((studentId) => ({
        studentId: studentId,
        teacherId: teacherId,
        masjidId: masjidId
      }));
  
      const response = await axiosInstance.post('Teacher/AssignStudent', requestBody, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      Toast.show({
        type: 'success',
        text1: 'Students Assigned',
        text2: 'Selected students have been assigned successfully!',
      });
      navigation.goBack();
      setSelectedStudents([]);
    } catch (error) {
      console.error('API Error:', error.response?.data || error.message);
      Toast.show({
        type: 'error',
        text1: 'Failed to Assign Students',
        text2: 'An error occurred while assigning students. Please try again.',
      });
      
    }
  };
  
  

  return (
    <View style={styles.container}>
      <Appbar
        title="Select Students"
        onMenuPress={() => navigation.goBack()}
        onNotifyPress={() => console.log('Notification Pressed')}
      />
   
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.tableHeader}>
          <Text style={styles.headerText}>Name</Text>
          <Text>{teacherId}</Text>
        </View>

        {loading ? (
          <Text style={styles.loadingText}>Loading...</Text>
        ) : (
          <FlatList
  data={studentData}
  keyExtractor={(item) => item.id.toString()}
  renderItem={({ item }) => (
    <TouchableOpacity onPress={() => toggleStudentSelection(item.id)}>
      <View style={[styles.tableRow, selectedStudents.includes(item.id) && styles.selectedRow]}>
        <Text style={styles.rowText}>{item.userName}</Text>
      </View>
    </TouchableOpacity>
  )}
/>

        )}
      </ScrollView>

      <TouchableOpacity onPress={AssignStudents} style={styles.assignButton}>
  <Text style={styles.assignText}>Assign Selected</Text>
</TouchableOpacity>


      <View style={styles.pagination}>
        <TouchableOpacity 
          onPress={() => fetchStudentes(pageNumber - 1)} 
          disabled={pageNumber === 1}
          style={[styles.pageButton, pageNumber === 1 && styles.disabledButton]}
        >
         <Text style={styles.text}>
         Prev
         </Text>
        </TouchableOpacity>

        <Text style={styles.pageText}>Page {pageNumber}</Text>

        <TouchableOpacity 
          onPress={() => fetchStudentes(pageNumber + 1)}
          style={styles.pageButton}
        >
         <Text style={styles.text}>
         Next
         </Text>
        </TouchableOpacity>
      </View>
      <Toast />
    </View>
  );
};

export default SelectStudents;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    padding: 16,
  },
  selectedRow: {
    backgroundColor: '#d1e7dd', // Light green highlight for selected students
  },
  assignButton: {
    backgroundColor: '#4CAF50',
    padding: 12,
    margin: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  assignText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
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
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  pageButton: {
    padding: 10,
    marginHorizontal: 10,
  },
  disabledButton: {
    opacity: 0.5,
  },
  pageText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  text:{
    fontSize: 14,
    color: '#333',
    fontWeight:'600'
  },
  icon:{
    width:50,
    height:50,
  },
  loadingText: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 16,
  },
});
