import { Image, StyleSheet, Text, TouchableOpacity, View, TextInput, ScrollView } from 'react-native';
import React, { useState } from 'react';
import Inputs from '../../constant/Inputs';
import { colors } from '../../constant/Colors';
import Button from '../../constant/Buttons';
import icons from '../../constant/Icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosInstance from '../../services/axiosInterceptor';

const AddCampus = ({ navigation }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    address: '',
    masjidId: '',
    status: ''
    });
  
  const RegisterStudents = async () => {
    if (!formData.userName || !formData.studentName || !formData.email || !formData.password) {
      Alert.alert('Error', 'Please fill all required fields.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    try {
      const token = await AsyncStorage.getItem('token')
      const response = await axiosInstance.post('/Campus/RegisterCampus', formData);
      console.log('Success:', response.data);

      // Show toast success message
      Toast.show({
        type: 'success',
        text1: 'Registration Successful',
        text2: 'Teacher has been registered successfully!',
      });

      navigation.goBack();
    } catch (error) {
      console.error('API Error:', error.response?.data || error.message);
      Alert.alert('Error', 'Failed to register teacher.');
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <Image source={icons.Madarsa} style={styles.logo} />
        </View>
        <Text style={styles.title}>
          Campus Registration
        </Text>
      </View>
      <ScrollView style={styles.formContainer} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
          <View style={styles.inputContainer}>
            <Inputs placeholder="Name" value={formData.name} onChangeText={(text) => handleInputChange('name', text)} />
            <Inputs placeholder="Description" value={formData.userName} onChangeText={(text) => handleInputChange('userName', text)} />
          <Inputs placeholder="Address" value={formData.email} onChangeText={(text) => handleInputChange('email', text)} />
          <Inputs placeholder="MasjidId" secureTextEntry value={formData.masjidId} onChangeText={(text) => handleInputChange('masjidId', text)} />
          </View>
      
      </ScrollView>
      <View style={styles.buttonContainer} >
        <Button title="Register Now" onPress={RegisterStudents}/>
      </View>
    </View>
  );
};

export default AddCampus;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.PrimaryGreen,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
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
    overflow: 'hidden', // Ensure the logo fits within the circle
  },
  logo: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain', // Adjust to contain
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
  label: {
    fontSize: 16,
    color: colors.white,
    marginBottom: 10,
  },
  input: {
    width: '100%',
    padding: 10,
    backgroundColor: colors.white,
    borderRadius: 5,
    marginBottom: 20,
  },
  addMoreText: {
    fontSize: 16,
    color: colors.white,
    textAlign: 'center',
    marginVertical: 10,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    paddingHorizontal: 20,
  },
});