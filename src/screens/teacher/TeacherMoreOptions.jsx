import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { LanguageContext } from '../../context/LanguageContext';
import Header from '../../components/Header';
import ContainerSection from '../../components/ContainerSection';
import icons from '../../constant/Icons';


const sections = [
  {
    icon: icons.Alif,
    label: { en: 'change language', other: 'زبان تبدیل کریں' },
    route: 'lang'
  },
  {
    icon: icons.Quran,
    label: { en: 'Surat', other: 'آیات' },
    route: 'surat'
  },
  {
    icon: icons.Assign,
    label: { en: 'Assigned Students', other: 'تفویض شدہ طلباء' },
    route: 'tstd'
  },
 
];

const TeacherMoreOptions = () => {
  const {language} = useContext(LanguageContext);
  return (
    <View>
      <Header
      title={language === "English" ? 'More options':'مزید اختیارات'}
      onMenuPress={() => console.log('Menu Pressed')}
      onNotifyPress={() => navigation.navigate('Notification')}
      />
    <ContainerSection sections={sections} />
    </View>
  )
}

export default TeacherMoreOptions

const styles = StyleSheet.create({})