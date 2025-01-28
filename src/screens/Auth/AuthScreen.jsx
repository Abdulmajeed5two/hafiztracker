import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_ENDPOINTS } from '../../services/apiService';
import icons from '../../constant/Icons';
import Inputs from '../../constant/Inputs';
import Button from '../../constant/Buttons';
import { colors } from '../../constant/Colors';

const AuthScreen = ({ navigation }) => {
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

  const handleLogin = async () => {
    try {
      const response = await axios.post(API_ENDPOINTS.Login_Masjid, {
        userName: userName,
        password: password,
      });
  
      console.log(response);
  
      await AsyncStorage.setItem('username', userName);
  
      navigation.navigate('MasjidScreen');
    } catch (error) {
      console.error(error);
      alert('Login failed. Please try again.');
    }
  };
  
  

  const handleRegister = async () => {
    try {
      const response = await axios.post(API_ENDPOINTS.Register_Masjid, {
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
      console.log(response);
      navigation.navigate('MasjidAuth');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.Row}>
        <Image source={icons.MainLogo} style={styles.logo} />
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
            <Inputs placeholder="password" value={password} onChangeText={setPassword} />
          </View>
          <Button title="Sign in here" onPress={handleLogin} />
          <Text style={styles.switchText}>
            Don't have an account?{' '}
            <TouchableOpacity onPress={() => setIsSignUp(true)}>
              <Text style={styles.switchLink}>Sign Up</Text>
            </TouchableOpacity>
          </Text>
        </View>
      )}
    </View>
  );
};

export default AuthScreen;

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
    width: 200,
    height: 200,
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
});
