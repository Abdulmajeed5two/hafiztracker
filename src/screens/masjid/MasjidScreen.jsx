import { StyleSheet, View } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import Hero from '../../components/Hero';
import ContainerSection from '../../components/ContainerSection';
import icons from '../../constant/Icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Drawer from '../../routes/Drawer';

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
    route: 'addparents',
  },
  
];

const MasjidScreen = ({ navigation }) => {
  const [userName, setUserName] = useState('');
  const drawerRef = useRef();

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

  useEffect(() => {
    getUsernameFromStorage();
  }, []);

  const handleMenuPress = () => {
    if (drawerRef.current) {
      drawerRef.current.openDrawer();
    }
  };

  return (
    <View style={styles.container}>
      {/* Drawer Overlay */}
      <Drawer ref={drawerRef} />

      {/* Main Content */}
      <View style={styles.content}>
        <Hero
          menuIcon={icons.Menu}
          title="Home"
          shareIcon={icons.Share}
          userIcon={icons.MasjidIcon}
          userName={userName}
          onMenuPress={handleMenuPress}
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
    zIndex: 1, // Main content stays below the drawer
  },
});
