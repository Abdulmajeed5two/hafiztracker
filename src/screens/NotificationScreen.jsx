import { StyleSheet, Text, View } from 'react-native';
import React, { useContext } from 'react';
import UserSection from '../components/UserSection';
import TopNavigation from '../routes/TopNavigation';
import { LanguageContext } from '../context/LanguageContext';
import Header from '../components/Header';

const NotificationScreen = ({navigation}) => {
  const {language} = useContext(LanguageContext);
  return (
    <View style={styles.container}>
      <Header 
      title={language === "English" ? 'Notifications':'اطلاعات'}
      onMenuPress={() => console.log('Menu Pressed')}
      onNotifyPress={() => navigation.navigate('Notification')}
      />
      <View style={styles.centerContainer}>
        <Text style={styles.noNotificationText}>{language === "English" ? 'No Notifications':'کوئی اطلاع نہیں'}</Text>
      </View>
    </View>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noNotificationText: {
    fontSize: 18,
    color: 'gray',
  },
});