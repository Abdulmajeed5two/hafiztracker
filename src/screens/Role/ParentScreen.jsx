import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Hero from '../../components/Hero'
import icons from '../../constant/Icons'
import ContainerSection from '../../components/ContainerSection'


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

const ParentScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
      <Hero
        menuIcon={icons.Menu}
        title="Home"
        shareIcon={icons.Share}
        userIcon={icons.Parent}
        userName="Suleman"
        userLocation="Karachi, Pakistan"
        onMenuPress={() => navigation.navigate('drawer')}
      />
      </View>
      <View style={styles.containerSection}>
        <ContainerSection sections={sections} />
      </View>
    </View>
  )
}

export default ParentScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }

})