import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import React, { useContext } from 'react';
import icons from '../../constant/Icons';
import { FlatList } from 'react-native-gesture-handler';
import { width } from '../../constant/Size';
import { colors } from '../../constant/Colors';
import { StudentContext } from '../../context/StudentContext';
import Appbar from '../../components/Appbar';
import axiosInstance from '../../services/axiosInterceptor';

const SelectStudents = ({navigation, route}) => {
    const { teacherId } = route.params; // Get teacher ID from navigatio
  const { studentData, fetchStudentes, pageNumber, loading } = useContext(StudentContext);

  const AssignStudents = async () => {
    try{
        const token = await AsyncStorage.getItem('token');
        const response = await axiosInstance.post('Teacher/AssignStudent', )
    } catch (error) {
        console.log(error);
    }
  }

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
              <View style={styles.tableRow}>
                <Text style={styles.rowText}>{item.userName}</Text>
              </View>
            )}
          />
        )}
      </ScrollView>

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
