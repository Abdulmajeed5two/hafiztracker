import { Image, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Inputs from '../constant/Inputs';
import { colors } from '../constant/Colors';
import icons from '../constant/Icons';
import Button from '../constant/Buttons';
import { API_ENDPOINTS } from '../services/apiService';
import DeviceInfo from 'react-native-device-info';
import Toast from 'react-native-toast-message'; 



const Verification = ({navigation}) => {
  const [Id, setId] = useState('');
  const [Code, setCode] = useState('');
  const [deviceId, setDeviceId] = useState('');
  const [deviceInfo, setDeviceInfo] = useState({});


  useEffect(() => {
    const fetchDeviceInfo = async () => {
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
    };

    fetchDeviceInfo();
  }, []);

  const handleVerification = async () => {
    try {
        const response = await axios.post(API_ENDPOINTS.Masjid_Verification, {
            userName: userName,
            password: password,
            deviceId: deviceId,
        });
        console.log('Login Response:', response.data.result);
        
        const token = response.data.result?.token;
        const status = response.data.result?.status; // Assuming status is part of the result
        
        if (!token) {
            throw new Error('Token or User ID is missing in the response');
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
        console.log('Token:', token);
        Toast.show({
            type: 'success',
            text1: 'Login Successful',
            text2: 'You have successfully logged in!',
        });
        navigation.navigate('MasjidScreen');
    } catch (error) {
        console.error('Login Error:', error);
        Toast.show({
            type: 'error',
            text1: 'Login Failed',
            text2: error.response?.data?.message || 'Invalid username or password. Please try again.',
        });
    }
};
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.logo} source={icons.Lock} />
        <Text style={styles.forgetText}>Verification Code</Text>
      </View>
      <View style={styles.inputContainer}>
        <Inputs
          placeholder="Enter Code"
          placeholderTextColor={colors.white}
          selectionColor={colors.white}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Verfiy" onPress={()=> navigation.navigate('newpass')} />
      </View>
    </View>
  );
};

export default Verification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.PrimaryGreen,
    paddingHorizontal: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 70,
    height: 70,
    tintColor: colors.white,
    marginBottom: 10,
  },
  forgetText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.white,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  buttonContainer: {
    width: '100%',
  },
});
