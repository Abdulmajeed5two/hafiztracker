import { StyleSheet, Text, View } from 'react-native'
import React, { useRef } from 'react'
import Hero from '../../components/Hero'
import ContainerSection from '../../components/ContainerSection'
import icons from '../../constant/Icons'
import Drawer from '../../routes/Drawer'


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
    route: 'homework'
  },
  {
    icon: icons.Quotes,
    label: { en: 'Quotes', other: 'اقتباسات' },
    route: 'quote'
  }
];

const TeacherScreen = () => {
    const drawerRef = useRef();
  

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
        userName="Imran Khan"
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