import { StyleSheet, Text, View, TouchableOpacity, FlatList, Image, Modal } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import Appbar from '../../components/Appbar';
import { colors } from '../../constant/Colors';
import { height, width } from '../../constant/Size';
import axiosInstance from '../../services/axiosInterceptor';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TeacherContext } from '../../context/TeacherContext';
import icons from '../../constant/Icons';

const AssignedStudents = ({ navigation }) => {
  const { teacherData } = useContext(TeacherContext);
  const [assignedData, setAssignedData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    getAssignedData();
  }, [teacherData]);

  const getAssignedData = async () => {
    if (!teacherData || teacherData.length === 0) {
      console.log('No teacher data available.');
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

          return { teacherName: teacher.teacherName, students: response.data.result.data };
        })
      );

      setAssignedData(allAssignedData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching assigned students:', error.response?.data || error.message);
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

      {/* Assign Button */}
      <View style={styles.campus}>
        <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('tselect')}>
          <Image source={icons.Assign} style={styles.icon} />
          <Text style={{ textAlign: 'center', top: 4 }}>Assign</Text>
        </TouchableOpacity>
      </View>

      {/* Table Header */}
      <View style={styles.tableHeader}>
        <Text style={styles.headerText}>Teacher Name</Text>
        <Text style={styles.headerText}>Students (#)</Text>
      </View>

      {/* Students List */}
      <FlatList
        data={assignedData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.tableRow}
            onPress={() => {
              setSelectedTeacher(item);
              setModalVisible(true);
            }}
          >
            <Text style={styles.rowText}>{item.teacherName}</Text>
            <Text style={styles.rowText}>{item.students.length} Students</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={styles.loadingText}>No assigned students found.</Text>}
      />

      {/* Modal to Show Students */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
  <View style={styles.modalContainer}>
    <View style={styles.modalContent}>
      <Text style={styles.modalTitle}>{selectedTeacher?.teacherName}'s Students</Text>

      {/* Table Header */}
      <View style={styles.modalTableHeader}>
        <Text style={styles.modalHeaderText}>Sr No</Text>
        <Text style={styles.modalHeaderText}>Student Name</Text>
      </View>

      {/* Table Body */}
      <FlatList
        data={selectedTeacher?.students || []}
        keyExtractor={(student, idx) => idx.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.modalTableRow}>
            <Text style={styles.modalRowText}>{index + 1}</Text>
            <Text style={styles.modalRowText}>{item.studentName}</Text>
          </View>
        )}
      />

      {/* Close Button */}
      <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.modalClose}>
        <Text style={styles.modalCloseText}>Close</Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal>

    </View>
  );
};

export default AssignedStudents;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingBottom: 20,
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
  campus: {
    margin: 12,
  },
  icon: {
    width: 50,
    height: 50,
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
  }, modalContainer: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: width - 40,
    maxHeight: height * 0.9,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  /* Table Header */
  modalTableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    width: '100%',
  },
  modalHeaderText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    flex: 1,
    textAlign: 'center',
  },
  modalTableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    width: '100%',
  },
  modalRowText: {
    fontSize: 14,
    color: '#333',
    flex: 1,
    textAlign: 'center',
  },
  /* Close Button */
  modalClose: {
    marginTop: 15,
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  modalCloseText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
