import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React from 'react';
import Header from '../components/Header';

const teacherData = [
  { id: '1', name: 'Abdul Rahman', subject: 'Quran Recitation', experience: '5 years' },
  { id: '2', name: 'Fatima Khan', subject: 'Hadith Studies', experience: '7 years' },
  { id: '3', name: 'Yusuf Ahmed', subject: 'Fiqh (Jurisprudence)', experience: '4 years' },
  { id: '4', name: 'Aisha Malik', subject: 'Seerah (Prophetic Biography)', experience: '6 years' },
  { id: '5', name: 'Omar Hassan', subject: 'Tajweed (Quranic Pronunciation)', experience: '8 years' },
  { id: '6', name: 'Zainab Ali', subject: 'Islamic History', experience: '3 years' },
  { id: '7', name: 'Bilal Hussain', subject: 'Aqeedah (Islamic Creed)', experience: '9 years' },
  { id: '8', name: 'Hafsa Iqbal', subject: 'Tafsir (Quranic Exegesis)', experience: '5 years' },
  { id: '9', name: 'Ibrahim Saleem', subject: 'Arabic Language', experience: '10 years' },
  { id: '10', name: 'Maryam Ahmed', subject: 'Islamic Ethics', experience: '2 years' },
];

const TeacherList = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Header
        title="Teacher List"
        onMenuPress={() => console.log('Menu Pressed')}
        onNotifyPress={() => navigation.navigate('Notification')}
      />
      <ScrollView style={styles.tableContainer}>
        <View style={styles.tableHeader}>
          <Text style={styles.headerText}>Name</Text>
          <Text style={styles.headerText}>Subject</Text>
          <Text style={styles.headerText}>Experience</Text>
        </View>

        {teacherData.map((teacher) => (
          <View key={teacher.id} style={styles.tableRow}>
            <Text style={styles.rowText}>{teacher.name}</Text>
            <Text style={styles.rowText}>{teacher.subject}</Text>
            <Text style={styles.rowText}>{teacher.experience}</Text>
          </View>
        ))}
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