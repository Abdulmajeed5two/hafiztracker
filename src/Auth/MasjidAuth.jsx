import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import Inputs from '../constant/Inputs';
import { colors } from '../constant/Colors';
import Button from '../constant/Buttons';
import icons from '../constant/Icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DeviceInfo from 'react-native-device-info';
import Toast from 'react-native-toast-message'; 
import axiosInstance from '../services/axiosInterceptor';

const MasjidAuth = ({ navigation }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [masjidName, setMasjidName] = useState('');
  const [yourName, setYourName] = useState('');
  const [email, setEmail] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [cnic, setCnic] = useState('');
  const [contact, setContact] = useState('');
  const [address, setAddress] = useState('');
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

  const handleLogin = async () => {
    try {
      const response = await axiosInstance.post('/Masjid/Login', {
            userName: userName,
            password: password,
            deviceId: deviceId,
        });
        console.log('Login Response:', response.data.result.userName);

        const { result } = response.data;
        const token = result?.token;    
        const status = result?.status;
        const username = result?.userName;

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
        if (token) {
            await AsyncStorage.setItem('token', token);
            await AsyncStorage.setItem('userName', username)
            console.log('Token:', token);
            Toast.show({
                type: 'success',
                text1: 'Login Successful',
                text2: 'You have successfully logged in!',
            });
            navigation.navigate('MasjidScreen');
        } else {
            throw new Error('Invalid Token');
        }
    } catch (error) {
        console.error('Login Error:', error);
        Toast.show({
            type: 'error',
            text1: 'Login Failed',
            text2: error.response?.data?.message || 'Invalid username or password. Please try again.',
        });
    }
};



  const handleRegister = async () => {
    try {
      const response = await axiosInstance.post('/Masjid/RegisterMasjid', {
        userName: userName,
        password: password,
        masjidName: masjidName,
        yourName: yourName,
        email: email,
        confirmPassword: confirmPassword,
        cnic: cnic,
        contact: contact,
        address: address,
      });

      console.log('Registration Response:', response.data);

      // Show success toast
      Toast.show({
        type: 'success',
        text1: 'Registration Successful',
        text2: 'You have successfully registered!',
      });

      // Navigate back to the login screen
      navigation.navigate('MasjidAuth');
    } catch (error) {
      console.error('Registration Error:', error);
      Toast.show({
        type: 'error',
        text1: 'Registration Failed',
        text2: 'Please check your details and try again.',
      });
    }
  };

  const handleForgotPassword = () => {
    Alert.alert(
      'Forgot Password',
      'Please contact support to reset your password.',
      [{ text: 'OK' }]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.Row}>
        <Image source={icons.MasjidIcon} style={styles.logo} />
        <Text style={styles.rowTxt}>Masjid Registration</Text>
      </View>

      {isSignUp ? (
        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Inputs placeholder="userName" value={userName} onChangeText={setUserName} />
            <Inputs placeholder="masjidName" value={masjidName} onChangeText={setMasjidName} />
            <Inputs placeholder="yourName" value={yourName} onChangeText={setYourName} />
            <Inputs placeholder="email" value={email} onChangeText={setEmail} />
            <Inputs placeholder="password" value={password} onChangeText={setPassword} />
            <Inputs placeholder="confirmPassword" value={confirmPassword} onChangeText={setConfirmPassword} />
            <Inputs placeholder="cnic" value={cnic} onChangeText={setCnic} />
            <Inputs placeholder="contact" value={contact} onChangeText={setContact} />
            <Inputs placeholder="address" value={address} onChangeText={setAddress} />
          </View>
          <Button title="Register" onPress={handleRegister} />
          <Text style={styles.switchText}>
            Already have an account?{''}
            <TouchableOpacity onPress={() => setIsSignUp(false)}>
              <Text style={styles.switchLink}>Sign In</Text>
            </TouchableOpacity>
          </Text>
        </View>
      ) : (
        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Inputs placeholder="Username" value={userName} onChangeText={setUserName} />
            <Inputs placeholder="password" value={password} onChangeText={setPassword} secureTextEntry />
          </View>
          <Button title="Sign in here" onPress={handleLogin} />
          <TouchableOpacity onPress={handleForgotPassword}>
            <Text style={styles.forgotPassword}>Forgot Password?</Text>
          </TouchableOpacity>
          <Text style={styles.switchText}>
            Don't have an account?{' '}
            <TouchableOpacity onPress={() => setIsSignUp(true)}>
              <Text style={styles.switchLink}>Sign Up</Text>
            </TouchableOpacity>
          </Text>
        </View>
      )}
      <Toast />
    </View>
  );
};

export default MasjidAuth;

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
    marginBottom: 20,
    tintColor: colors.white,
  },
  formContainer: {
    width: '100%',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  switchText: {
    marginTop: 10,
    fontSize: 14,
    color: colors.white,
    alignSelf: 'center',
  },
  switchLink: {
    color: colors.white,
    fontWeight: 'bold',
  },
  forgotPassword: {
    marginTop: 10,
    fontSize: 14,
    color: colors.white,
    alignSelf: 'flex-end',
    textDecorationLine: 'underline',
  },
});