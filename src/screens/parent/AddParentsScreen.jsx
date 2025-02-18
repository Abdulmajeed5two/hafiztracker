import { Image, StyleSheet, Text, TouchableOpacity, View, TextInput, ScrollView } from 'react-native';
import React, { useState } from 'react';
import Inputs from '../../constant/Inputs';
import { colors } from '../../constant/Colors';
import Button from '../../constant/Buttons';
import icons from '../../constant/Icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddParentsScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    fatherName:'',
    motherName:'',
    fatherCNIC:'',
    motherCNIC:'',
    contact:'',
    address: '',
    description:'',
    password: '',
    confirmPassword: '',
    masjidId:'36'
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
      const response = await axiosInstance.post('/Student/RegisterStudent', formData);
      console.log('Success:', response.data);

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
          <Image source={icons.Parent} style={styles.logo} />
        </View>
        <Text style={styles.title}>
          Parents Registration
        </Text>
      </View>
      <ScrollView style={styles.formContainer} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
          <View style={styles.inputContainer}>
            <Inputs placeholder="User Name" value={formData.userName} onChangeText={(text) => handleInputChange('userName', text)} />
            <Inputs placeholder="Email" value={formData.email} onChangeText={(text) => handleInputChange('email', text)} />
          <Inputs placeholder="Father Name" value={formData.fatherName} onChangeText={(text) => handleInputChange('fatherName', text)} />
          <Inputs placeholder="Mother Name" secureTextEntry value={formData.motherName} onChangeText={(text) => handleInputChange('motherName', text)} />
          <Inputs placeholder="Father CNIC" secureTextEntry value={formData.fatherCNIC} onChangeText={(text) => handleInputChange('fatherCNIC', text)} />
          <Inputs placeholder="Mother CNIC" value={formData.motherCNIC} onChangeText={(text) => handleInputChange('motherCNIC', text)} />
          <Inputs placeholder="Contact" value={formData.contact} onChangeText={(text) => handleInputChange('contact', text)} />
          <Inputs placeholder="Address" value={formData.address} onChangeText={(text) => handleInputChange('address', text)} />
          <Inputs placeholder="description" value={formData.description} onChangeText={(text) => handleInputChange('description', text)} />
          <Inputs placeholder="password" value={formData.password} onChangeText={(text) => handleInputChange('password', text)} />
          <Inputs placeholder="confirmPassword" value={formData.confirmPassword} onChangeText={(text) => handleInputChange('confirmPassword', text)} />
          <Inputs placeholder="masjidId" value={formData.masjidId} onChangeText={(text) => handleInputChange('masjidId', text)} />
          </View>
      
      </ScrollView>
      <View style={styles.buttonContainer} >
        <Button title="Register Now" onPress={RegisterStudents}/>
      </View>
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
    margin:8,
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