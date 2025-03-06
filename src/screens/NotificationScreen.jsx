import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { LanguageContext } from '../context/LanguageContext';
import Header from '../components/Header';
import axiosInstance from '../services/axiosInterceptor';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NotificationScreen = ({ navigation }) => {
  const [notifications, setNotifications] = useState([]);
  const { language } = useContext(LanguageContext);

  useEffect(() => {
    GetNotifications();
  }, []);

  const GetNotifications = async () => {
    try {
      const masjidId = await AsyncStorage.getItem('masjidId');
      const token = await AsyncStorage.getItem('token');
      const stdId = await AsyncStorage.getItem('studentId');
      const response = await axiosInstance.post('Notification/GetByStudentId', {
        masjidId: masjidId,
        studentId: stdId,
      }, { headers: { 'Authorization': `Bearer ${token}` } }
      )
      setNotifications(response.data.result.data);
      console.log(response.data.result.data)
    }
    catch (error) {
      console.error(error);
    }
  }

  const handleNotificationPress = (notification) => {
    navigation.navigate('stdhomework', {
      notificationId: notification.id,
      title: notification.title,
      description: notification.description,
      date: notification.date,
    });
  };

  return (
    <View style={styles.container}>
      <Header
        title={language === "English" ? 'Notifications' : 'اطلاعات'}
        onMenuPress={() => console.log('Menu Pressed')}
        onNotifyPress={() => navigation.navigate('Notification')}
      />
      {notifications.length === 0 ? (
        <View style={styles.centerContainer}>
          <Text style={styles.noNotificationText}>
            {language === "English" ? 'No Notifications' : 'کوئی اطلاع نہیں'}
          </Text>
        </View>
      ) : (
        <ScrollView style={styles.scrollContainer}>
          {notifications.map((notification) => (
            <TouchableOpacity 
              key={notification.id} 
              style={styles.notificationCard}
              onPress={() => handleNotificationPress(notification)}
              activeOpacity={0.7}
            >
              <Text style={styles.title}>
                {notification.title ?? (language === "English" ? 'No Title' : 'کوئی عنوان نہیں')}
              </Text>
              <Text style={styles.description}>
                {notification.description ?? (language === "English" ? 'No Description' : 'کوئی تفصیل نہیں')}
              </Text>
              <Text style={styles.date}>
                {notification.date 
                  ? new Date(notification.date).toLocaleDateString()
                  : (language === "English" ? 'No Date' : 'کوئی تاریخ نہیں')}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
    padding: 10,
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
  notificationCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  date: {
    fontSize: 12,
    color: '#999',
  },
});