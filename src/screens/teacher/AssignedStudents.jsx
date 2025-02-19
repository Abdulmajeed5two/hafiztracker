import { ScrollView, StyleSheet, Text, View, TouchableOpacity, FlatList, Image } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import Appbar from '../../components/Appbar';
import { colors } from '../../constant/Colors';
import { width } from '../../constant/Size';
import axiosInstance from '../../services/axiosInterceptor';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TeacherContext } from '../../context/TeacherContext';
import icons from '../../constant/Icons';

const AssignedStudents = ({ navigation }) => {
  const { teacherData } = useContext(TeacherContext); // Extract teacher data
  const [assignedData, setAssignedData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAssignedData();
  }, [teacherData]);

  const getAssignedData = async () => {
    if (!teacherData || teacherData.length === 0) {
      console.log("No teacher data available.");
      return;
    }
  
    try {
      const token = await AsyncStorage.getItem('token');
      const allAssignedData = await Promise.all(
        teacherData.map(async (teacher) => {
          if (!teacher.id) {
            console.log(`Skipping teacher with missing ID: ${teacher.teacherName}`);
            return { teacherName: teacher.teacherName, students: [] };
          }
  
          const response = await axiosInstance.get(`/Student/GetStudentByTeacherId?Id=${teacher.id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
            console.log('daata...................', response.data.result.data);
          return { teacherName: teacher.teacherName, students: response.data.result.data };
        })
      );
  
      setAssignedData(allAssignedData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching assigned students:", error.response?.data || error.message);
      setLoading(false);
    }
  };
  

  return (
    <View style={styles.container}>
      <Appbar
        title="Assigned Students"
        onMenuPress={() => navigation.goBack()}
        onNotifyPress={() => console.log('Notification Pressed')}
      />
 <View style={styles.campus}>
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('tselect')}>
            <Image source={icons.Assign} style={styles.icon} />
            <Text style={{textAlign:'center', top:4}}>Assign More</Text>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.tableHeader}>
          <Text style={styles.headerText}>Teacher Name</Text>
          <Text style={styles.headerText}>Student Name</Text>
        </View>

        {loading ? (
          <Text style={styles.loadingText}>Loading...</Text>
        ) : (
          <FlatList
            data={assignedData}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <>
                {item.students.length > 0 ? (
                  item.students.map((student, idx) => (
                    <View key={idx} style={styles.tableRow}>
                      <Text style={styles.rowText}>{item.teacherName}</Text>
                      <Text style={styles.rowText}>{student.studentName}</Text>
                    </View>
                  ))
                ) : (
                  <View style={styles.tableRow}>
                    <Text style={styles.rowText}>{item.teacherName}</Text>
                    <Text style={styles.rowText}>No students assigned</Text>
                  </View>
                )}
              </>
            )}
          />
        )}
      </ScrollView>
    </View>
  );
};

export default AssignedStudents;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  card: {
    backgroundColor: colors.white,
    width: (width - 64) / 3,
    height: (width - 64) / 3,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    elevation: 3,
    marginBottom: 16,
},
campus:{
    margin:12,
},
icon:{
  width:50,
  height:50,
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
  loadingText: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 16,
  },
});
