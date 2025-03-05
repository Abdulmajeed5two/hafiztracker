import { Image, StyleSheet, Text, TouchableOpacity, View,ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import Inputs from '../constant/Inputs';
import { colors } from '../constant/Colors';
import Button from '../constant/Buttons';
import icons from '../constant/Icons';
import axiosInstance from '../services/axiosInterceptor';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DeviceInfo from 'react-native-device-info';
import Toast from 'react-native-toast-message';
import { getFcmToken } from '../services/Firebase';


const StudentAuth = ({ navigation }) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [deviceId, setDeviceId] = useState('');
  const [deviceInfo, setDeviceInfo] = useState({});
  const [fcmToken, setFcmToken] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchDeviceInfo = async () => {
      try {
        const uniqueId = await DeviceInfo.getUniqueId();
        const model = await DeviceInfo.getModel();
        const osVersion = await DeviceInfo.getSystemVersion();
        const manufacturer = await DeviceInfo.getManufacturer();

        setDeviceId(uniqueId);
        setDeviceInfo({
          deviceId: uniqueId,
          deviceModel: model,
          osVersion: osVersion,
          manufacturer: manufacturer,
        });

        console.log('Device Info:', {
          deviceId: uniqueId,
          deviceModel: model,
          osVersion: osVersion,
          manufacturer: manufacturer,
        });
      } catch (error) {
        console.error('Error fetching device info:', error);
      }
    };

     const fetchToken = async () => {
          const token = await getFcmToken();
          console.log('FCM Token:', token);
          setFcmToken(token);
        };
    
    fetchToken();
    fetchDeviceInfo();
  }, []);

  const handleLogin = async () => {
    if (!userName || !password) {
      Toast.show({
        type: 'error',
        text1: 'Missing Fields',
        text2: 'Please enter username and password.',
      });
      return;
    }
    setIsLoading(true); 
    try {
      const response = await axiosInstance.post('/Student/Login', {
        userName,
        password,
        deviceId,
        fcmToken,
      });

      console.log('Login Response:', response.data);

      const { result } = response.data;
      const token = result?.token;
      const status = result?.status;
      const StdId = result?.studentId;

      if (!token) {
        throw new Error('Token is missing in the response');
      }

      if (status === 0) {
        navigation.navigate('verify');
        Toast.show({
          type: 'info',
          text1: 'Verification Required',
          text2: 'Please verify your account to proceed.',
        });
        return;
      }

      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('userName', result?.userName || '');
      await AsyncStorage.setItem('studentId', StdId.toString());

      Toast.show({
        type: 'success',
        text1: 'Login Successful',
        text2: 'You have successfully logged in!',
      });

      navigation.navigate('home');
    } catch (error) {
      console.error('Login Error:', error);
      Toast.show({
        type: 'error',
        text1: 'Login Failed',
        text2: error.response?.data?.message || 'Invalid username or password.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <Image source={icons.StdList} style={styles.logo} />
        </View>
      </View>

      {/* Login Form */}
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Inputs  value={userName}  onChangeText={setUserName} placeholder="Enter Student Name" />
          <Inputs  value={password}  onChangeText={setPassword} placeholder="Enter Password" />
        </View>
        {isLoading ? (  
          <ActivityIndicator size="large" color={colors.white} />
        ) : (
          <Button title="Sign in" onPress={handleLogin} />
        )}
      </View>
      <Toast />
    </View>
  );
};

export default StudentAuth;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.PrimaryGreen,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    justifyContent: 'center', 
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  logo: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    tintColor: colors.PrimaryGreen,
  },
  formContainer: {
    width: '100%',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
});
