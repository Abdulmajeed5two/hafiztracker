import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import Hero from '../../components/Hero'
import ContainerSection from '../../components/ContainerSection'
import icons from '../../constant/Icons'
import Drawer from '../../routes/Drawer'
import AsyncStorage from '@react-native-async-storage/async-storage'


const sections = [
  {
    icon: icons.Clock,
    label: { en: 'Prayer Time', other: 'نماز کا وقت' },
    route: 'PrayTime'
  },
  {
    icon: icons.Calendar,
    label: { en: 'Calendar', other: 'کالنڈر' },
    route: 'calender'
  },
  {
    icon: icons.Allah,
    label: { en: '99 Names', other: '99 نام' },
    route: 'namesofallah'
  },
  {
    icon: icons.Notify,
    label: { en: 'Notification', other: 'نوٹیفیکیشن' },
    route: 'Notification'
  },
  {
    icon: icons.Quran,
    label: { en: 'Homework', other: 'پڑھیں' },
    route: 'stdselection'
  },
  {
    icon: icons.ActUser,
    label: { en: 'Activities', other: 'سرگرمیاں' },
    route: 'checkactstd'
  }
];

const TeacherScreen = () => {
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
            <Drawer ref={drawerRef} />
      <View style={styles.header}>
      <Hero
        menuIcon={icons.Menu}
        title="Home"
        shareIcon={icons.Share}
        userIcon={icons.Teacher}
        userName={userName}
        userLocation="Karachi, Pakistan"
        onMenuPress={handleMenuPress}
        />
      </View>
      <View style={styles.containerSection}>
      <ContainerSection sections={sections} />
      </View>
    </View>
  )
}

export default TeacherScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
      }    
})