import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React from 'react';
import Header from '../components/Header';

// Dummy data for the student list with Islamic names
const studentData = [
  { id: '1', name: 'Ahmed Ali', grade: 'Grade 10', attendance: '95%' },
  { id: '2', name: 'Fatima Khan', grade: 'Grade 11', attendance: '90%' },
  { id: '3', name: 'Yusuf Ahmed', grade: 'Grade 9', attendance: '98%' },
  { id: '4', name: 'Aisha Rahman', grade: 'Grade 12', attendance: '92%' },
  { id: '5', name: 'Omar Hassan', grade: 'Grade 10', attendance: '89%' },
  { id: '6', name: 'Zainab Malik', grade: 'Grade 11', attendance: '96%' },
  { id: '7', name: 'Bilal Hussain', grade: 'Grade 9', attendance: '91%' },
  { id: '8', name: 'Hafsa Iqbal', grade: 'Grade 12', attendance: '94%' },
  { id: '9', name: 'Ibrahim Saleem', grade: 'Grade 10', attendance: '97%' },
  { id: '10', name: 'Maryam Ahmed', grade: 'Grade 11', attendance: '93%' },
];

const StudentList = () => {
  return (
    <View style={styles.container}>
      <Header
        title="Student List"
        onMenuPress={() => console.log('Menu Pressed')}
        onNotifyPress={() => console.log('Notification Pressed')}
      />
      <ScrollView style={styles.tableContainer}>
        {/* Table Header */}
        <View style={styles.tableHeader}>
          <Text style={styles.headerText}>Name</Text>
          <Text style={styles.headerText}>Grade</Text>
          <Text style={styles.headerText}>Attendance</Text>
        </View>

        {/* Table Rows */}
        {studentData.map((student) => (
          <View key={student.id} style={styles.tableRow}>
            <Text style={styles.rowText}>{student.name}</Text>
            <Text style={styles.rowText}>{student.grade}</Text>
            <Text style={styles.rowText}>{student.attendance}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default StudentList;

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
    backgroundColor: '#4CAF50', // Green header
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