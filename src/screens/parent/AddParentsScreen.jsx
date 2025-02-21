import { Image, StyleSheet, Text, View, ScrollView, Alert, KeyboardAvoidingView } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import Inputs from '../../constant/Inputs';
import { colors } from '../../constant/Colors';
import Button from '../../constant/Buttons';
import icons from '../../constant/Icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosInstance from '../../services/axiosInterceptor';
import Toast from 'react-native-toast-message';
import { ParentsContext } from '../../context/ParentsContext';

const AddParentsScreen = ({ navigation }) => {
  
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    fatherName: '',
    motherName: '',
    fatherCNIC: '',
    motherCNIC: '',
    contact: '',
    address: '',
    description: '',
    password: '',
    confirmPassword: '',
    masjidId: '',
    
  });

  useEffect(() => {
    const fetchMasjidId = async () => {
      const masjidId = await AsyncStorage.getItem('id');
      if (masjidId) {
        setFormData((prev) => ({ ...prev, masjidId }));
      }
    };
    fetchMasjidId();
  }, []);


  const RegisterStudents = async () => {
    if (!formData.userName || !formData.fatherName || !formData.email || !formData.password) {
      Alert.alert('Error', 'Please fill all required fields.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Password and Confirm Password do not match.',
      });
      return;
    }

    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axiosInstance.post('/Parent/RegisterParent', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      console.log('Success:', response.data);

      Toast.show({
        type: 'success',
        text1: 'Registration Successful',
        text2: 'Parent has been registered successfully!',
      });

      navigation.goBack();
    } catch (error) {
      console.error('API Error:', error.response?.data || error.message);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to register parent. Please try again.',
      })
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <Image source={icons.Parent} style={styles.logo} />
        </View>
        <Text style={styles.title}>Parents Registration</Text>
      </View>
  <KeyboardAvoidingView style={{ flex: 1, width: '100%' }} behavior='padding'>
      <ScrollView style={styles.formContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.inputContainer}>
          <Inputs placeholder="User Name" value={formData.userName} onChangeText={(text) => handleInputChange('userName', text)} />
          <Inputs placeholder="Email" value={formData.email} onChangeText={(text) => handleInputChange('email', text)} />
          <Inputs placeholder="Father Name" value={formData.fatherName} onChangeText={(text) => handleInputChange('fatherName', text)} />
          <Inputs placeholder="Mother Name" value={formData.motherName} onChangeText={(text) => handleInputChange('motherName', text)} />
          <Inputs placeholder="Father CNIC" value={formData.fatherCNIC} onChangeText={(text) => handleInputChange('fatherCNIC', text)} />
          <Inputs placeholder="Mother CNIC" value={formData.motherCNIC} onChangeText={(text) => handleInputChange('motherCNIC', text)} />
          <Inputs placeholder="Contact" value={formData.contact} onChangeText={(text) => handleInputChange('contact', text)} />
          <Inputs placeholder="Address" value={formData.address} onChangeText={(text) => handleInputChange('address', text)} />
          <Inputs placeholder="Description" value={formData.description} onChangeText={(text) => handleInputChange('description', text)} />
          <Inputs placeholder="Password" secureTextEntry value={formData.password} onChangeText={(text) => handleInputChange('password', text)} />
          <Inputs placeholder="Confirm Password" secureTextEntry value={formData.confirmPassword} onChangeText={(text) => handleInputChange('confirmPassword', text)} />
        </View>
      </ScrollView>
  </KeyboardAvoidingView>

      <View style={styles.buttonContainer}>
        <Button title="Register Now" onPress={RegisterStudents} />
      </View>

      <Toast />
    </View>
  );
};

export default AddParentsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.PrimaryGreen,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  header: {
    margin: 8,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    flexWrap: 'wrap',
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
    overflow: 'hidden',
  },
  logo: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.white,
    textAlign: 'center',
    flexShrink: 1,
    marginTop: 10,
  },
  formContainer: {
    width: '100%',
    flex: 1,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    paddingHorizontal: 20,
  },
});
