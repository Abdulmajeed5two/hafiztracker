import { Image, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DeviceInfo from 'react-native-device-info';
import Toast from 'react-native-toast-message';
import Inputs from '../constant/Inputs';
import { colors } from '../constant/Colors';
import Button from '../constant/Buttons';
import icons from '../constant/Icons';
import axiosInstance from '../services/axiosInterceptor';

const TeacherAuth = ({ navigation }) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [deviceId, setDeviceId] = useState('');
  const [deviceInfo, setDeviceInfo] = useState({});
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
      const response = await axiosInstance.post('/Teacher/Login', {
        userName,
        password,
        deviceId,
      });

      console.log('Login Response:', response.data);

      const { result } = response.data;
      const token = result?.token;
      const status = result?.status;
      const Id = result?.id;
      const masjidId = result?.masjidId;

      if (!token) {
        throw new Error('Token is missing in the response');
      }

      if (status === 1) {
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
      await AsyncStorage.setItem('id', Id.toString());
      await AsyncStorage.setItem('masjidId', masjidId.toString());

      Toast.show({
        type: 'success',
        text1: 'Login Successful',
        text2: 'You have successfully logged in!',
      });

      navigation.navigate('teacher');
    } catch (error) {
      console.error('Login Error:', error);
      Toast.show({
        type: 'error',
        text1: 'Login Failed',
        text2: error.response?.data?.message || 'Invalid username or password.',
      });
    } finally {
      setIsLoading(false);  // Set loading state back to false after login attempt is complete
    }
  };

  return (
    <View style={styles.container}>
      <Image source={icons.Teacher} style={styles.logo} />
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Inputs
            placeholder="Enter Teacher Name"
            value={userName}
            onChangeText={setUserName}
          />
          <Inputs
            placeholder="Enter Password"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />
        </View>

        {/* Show ActivityIndicator while loading */}
        {isLoading ? (
          <ActivityIndicator size="large" color={colors.white} style={styles.loader} />
        ) : (
          <Button title="Sign in" onPress={handleLogin} />
        )}
      </View>
      <Toast />
    </View>
  );
};

export default TeacherAuth;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.PrimaryGreen,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  formContainer: {
    width: '100%',
    marginTop: 20,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  loader: {
    marginTop: 20,  // Add some margin to space it out
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.white,
    textAlign: 'center',
    marginBottom: 20,
  },
});
