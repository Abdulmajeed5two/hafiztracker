import { ScrollView, StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StudentContext } from '../../context/StudentContext';
import Header from '../../components/Header';
import { colors } from '../../constant/Colors';
import { width } from '../../constant/Size';
import axiosInstance from '../../services/axiosInterceptor';

const TeacherStudents = ({ navigation }) => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const { fetchStudentes, pageNumber } = useContext(StudentContext);

  useEffect(() => {
    getStudentOfTeacher();
  }, []);

  const getStudentOfTeacher = async () => {
    try {
      const teacherId = await AsyncStorage.getItem('id');
      const token = await AsyncStorage.getItem('token');
      console.log('Teacher ID:', teacherId);
      if (!teacherId) {
        console.log("No teacher ID found.");
        setLoading(false);
        return;
      }

      const response = await axiosInstance.get(`/Student/GetStudentByTeacherId?Id=${teacherId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setStudents(response.data.result.data || []);
      setLoading(false);
    } catch (error) {
      console.log("Error fetching students:", error);
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Header
        title="Student List"
        onMenuPress={() => console.log('Menu Pressed')}
        onNotifyPress={() => console.log('Notification Pressed')}
      />

      <View style={styles.tableHeader}>
        <Text style={styles.headerText}>Sr No</Text>
        <Text style={styles.headerText}>Name</Text>
        <Text style={styles.headerText}>Phone</Text>
      </View>

      {loading ? (
        <Text style={styles.loadingText}>Loading...</Text>
      ) : (
        <FlatList
          data={students}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.tableRow}>
              <Text style={styles.rowText}>{index + 1}</Text>
              <Text style={styles.rowText}>{item.userName}</Text>
              <Text style={styles.rowText}>{item.phone}</Text>
            </View>
          )}
        />
      )}

      <View style={styles.pagination}>
        <TouchableOpacity 
          onPress={() => fetchStudentes(pageNumber - 1)} 
          disabled={pageNumber === 1}
          style={[styles.pageButton, pageNumber === 1 && styles.disabledButton]}
        >
          <Text style={styles.text}>Prev</Text>
        </TouchableOpacity>

        <Text style={styles.pageText}>Page {pageNumber}</Text>

        <TouchableOpacity 
          onPress={() => fetchStudentes(pageNumber + 1)}
          style={styles.pageButton}
        >
          <Text style={styles.text}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TeacherStudents;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
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
  text: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
  },
  loadingText: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 16,
  },
});
