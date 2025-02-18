import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React from 'react';
import Header from '../../components/Header';
import ContainerSection from '../../components/ContainerSection';
import icons from '../../constant/Icons';

const homeworkData = [
  {
    id: '1',
    date: '2025-10-01',
    surah: 'Surah Al-Fatiha',
    detail: 'Memorize verses 1-4',
  },
  {
    id: '2',
    date: '2025-10-05',
    surah: 'Surah Al-Baqarah',
    detail: 'Read and understand verses 1-10',
  },
  {
    id: '3',
    date: '2024-10-10',
    surah: 'Surah Al-Ikhlas',
    detail: 'Memorize the entire Surah',
  },
  {
    id: '4',
    date: '2023-10-15',
    surah: 'Surah Al-Kahf',
    detail: 'Read verses 1-20 and reflect',
  },
  {
    id: '5',
    date: '2023-10-20',
    surah: 'Surah Yasin',
    detail: 'Recite with proper Tajweed',
  },
];
const sections = [
  {
    icon: icons.Alif,
    label: { en: 'Add HomeWork', other: 'ہوم ورک شامل کریں' },
    route: 'homeworkform'
  },
];

const HomeWork = () => {
  return (
    <View style={styles.container}>
      <Header
        title="Homework"
        onMenuPress={() => console.log('Menu Pressed')}
        onNotifyPress={() => console.log('Notification Pressed')}
      />
        <ContainerSection sections={sections} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.tableHeader}>
          <Text style={styles.headerText}>Date</Text>
          <Text style={styles.headerText}>Surah</Text>
          <Text style={styles.headerText}>Detail</Text>
        </View>

        {homeworkData.map((homework) => (
          <View key={homework.id} style={styles.tableRow}>
            <Text style={styles.rowText}>{homework.date}</Text>
            <Text style={styles.rowText}>{homework.surah}</Text>
            <Text style={styles.rowText}>{homework.detail}</Text>
          </View>
        ))} 
      </ScrollView>
    </View>
  );
};

export default HomeWork;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
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