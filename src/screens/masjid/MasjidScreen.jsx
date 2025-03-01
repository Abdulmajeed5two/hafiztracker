import { StyleSheet, View, Text } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import Hero from '../../components/Hero';
import ContainerSection from '../../components/ContainerSection';
import icons from '../../constant/Icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Drawer from '../../routes/Drawer';
import axiosInstance from '../../services/axiosInterceptor';

const sections = [
  {
    icon: icons.Clock,
    label: { en: 'Prayer Time', other: 'نماز کا وقت' },
    route: 'PrayTime',
  },
  {
    icon: icons.Calendar,
    label: { en: 'Calendar', other: 'کالنڈر' },
    route: 'calender',
  },
  {
    icon: icons.Allah,
    label: { en: '99 Names', other: '99 نام' },
    route: 'namesofallah',
  },
  {
    icon: icons.TeacherList,
    label: { en: 'Add Teacher', other: 'نوٹیفیکیشن' },
    route: 'teachlist',
  },
  {
    icon: icons.StdList,
    label: { en: 'Add Student', other: 'پڑھیں' },
    route: 'stdlist',
  },
  {
    icon: icons.Parent,
    label: { en: 'Parents', other: 'والدین' },
    route: 'parentslist',
  },
];


const MasjidScreen = ({ navigation }) => {
  const [userName, setUserName] = useState('');
  const drawerRef = useRef();
  const [teacherCount, setTeacherCount] = useState(0);
  const [studentCount, setStudentCount] = useState(0);

  const getUsernameFromStorage = async () => {
    try {
      const storedUsername = await AsyncStorage.getItem('userName');
      if (storedUsername !== null) {
        setUserName(storedUsername);
      } else {
        console.log('No username stored');
      }
    } catch (error) {
      console.error('Error retrieving username:', error);
    }
  };

  const getCountsOfTeacher = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const MasjidId = await AsyncStorage.getItem('id');
      if (!token || !MasjidId) {
        console.error('Token or MasjidId is missing');
        return;
      }
      const response = await axiosInstance.get(
        `Teacher/GetCountOfTeacherByMasjidId?MasjidId=${MasjidId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setTeacherCount(response.data.result);
    } catch (error) {
      console.error('Error getting teacher count:', error.response?.status, error.response?.data);
    }
  };

  const getCountsOfStudents = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const MasjidId = await AsyncStorage.getItem('id');
      if (!token || !MasjidId) {
        console.error('Token or MasjidId is missing');
        return;
      }
      const response = await axiosInstance.get(
        `Student/GetStudentCount?Id=${MasjidId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setStudentCount(response.data);
    } catch (error) {
      console.error('Error getting teacher count:', error.response?.status, error.response?.data);
    }
  };

  useEffect(() => {
    getUsernameFromStorage();
    getCountsOfTeacher();
    getCountsOfStudents();
  }, []);

  const handleMenuPress = () => {
    if (drawerRef.current) {
      drawerRef.current.openDrawer();
    }
  };

  return (
    <View style={styles.container}>
      <Drawer ref={drawerRef} />
      <View style={styles.content}>
        <Hero
          menuIcon={icons.Menu}
          title="Home"
          shareIcon={icons.Share}
          userIcon={icons.MasjidIcon}
          userName={userName}
          onMenuPress={handleMenuPress}
          Teachers={`Teachers: ${teacherCount}`}
          Students={`Students : ${studentCount}`}
        />
        <ContainerSection sections={sections} />
      </View>
    </View>
  );
};

export default MasjidScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    zIndex: 1,
  },
});