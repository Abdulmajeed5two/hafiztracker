import { Image, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Inputs from '../constant/Inputs';
import { colors } from '../constant/Colors';
import Button from '../constant/Buttons';
import icons from '../constant/Icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosInstance from '../services/axiosInterceptor';
import DeviceInfo from 'react-native-device-info';


const ParentAuth = ({ navigation }) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [deviceId, setDeviceId] = useState('');
  const [deviceInfo, setDeviceInfo] = useState({});

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

    try {
      const response = await axiosInstance.post('/Parent/Login', {
        userName,
        password,
        deviceId,
      });

      console.log('Login Response:', response.data);

      const { result } = response.data;
      const token = result?.token;
      const status = result?.status;

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

      // Store token & username
      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('userName', result?.userName || '');

      Toast.show({
        type: 'success',
        text1: 'Login Successful',
        text2: 'You have successfully logged in!',
      });

      navigation.navigate('parenthome');
    } catch (error) {
      console.error('Login Error:', error);
      Toast.show({
        type: 'error',
        text1: 'Login Failed',
        text2: error.response?.data?.message || 'Invalid username or password.',
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.Row}>
        <Image source={icons.Parent} style={styles.logo} />
      </View>

      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Inputs value={userName}  onChangeText={setUserName} placeholder="Enter Parent Name" />
          <Inputs  value={password}  onChangeText={setPassword} placeholder="Enter Password" secureTextEntry={true} />
        </View>
        <Button title="Sign in"  onPress={handleLogin}/>
      </View>
    </View>
  );
};

export default ParentAuth;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.PrimaryGreen,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  Row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 20,
  },
  rowTxt: {
    fontWeight: '600',
    fontSize: 16,
    color: colors.white,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  formContainer: {
    width: '100%',
    marginTop: 20,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
});