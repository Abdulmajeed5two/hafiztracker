import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import ContainerSection from '../components/ContainerSection';
import icons from '../constant/Icons';
import Header from '../components/Header';
import { LanguageContext } from '../context/LanguageContext';


const sections = [
  {
    icon: icons.Alif,
    label: { en: 'change language', other: 'زبان تبدیل کریں' },
    route: 'lang'
  },
  {
    icon: icons.Quran,
    label: { en: 'Ayats', other: 'آیات' },
    route: 'quran'
  },
  {
    icon: icons.Logout,
    label: { en: 'Logout', other: 'لاگ آؤٹ' },
    route: 'role'
  }
];

const MoreOptions = () => {
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

export default MoreOptions

const styles = StyleSheet.create({})