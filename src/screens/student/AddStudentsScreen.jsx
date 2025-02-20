import { Image, StyleSheet, Text, TouchableOpacity, View, TextInput, ScrollView, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import Inputs from '../../constant/Inputs';
import { colors } from '../../constant/Colors';
import Button from '../../constant/Buttons';
import icons from '../../constant/Icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosInstance from '../../services/axiosInterceptor';
import { ParentsContext } from '../../context/ParentsContext';
import CustomSelectList from '../../components/SelectList';
import Toast from 'react-native-toast-message';

const AddStudentsScreen = ({ navigation }) => {
  const { parentsData } = useContext(ParentsContext);
  const [loading, setLoading] = useState(false);
  const [selectedParentId, setSelectedParentId] = useState(null); 

  const [formData, setFormData] = useState({
    studentName: '',
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    whatsapp: '',
    parentId: '',
    emergencyContact: '',
    area: '',
    address: '',
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
    if (!formData.userName || !formData.studentName || !formData.email || !formData.password || !selectedParentId) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please fill all required fields.',
      });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Passwords do not match.',
      });
      return;
    }

    setLoading(true); // Start loading
    const updatedFormData = { ...formData, parentId: selectedParentId };

    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axiosInstance.post('/Student/RegisterStudent', updatedFormData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('Success:', response.data);
      Toast.show({
        type: 'success',
        text1: 'Registration Successful',
        text2: 'Student has been registered successfully!',
      });

      navigation.goBack();
    } catch (error) {
      console.error('API Error:', error.response?.data || error.message);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to register student.',
      });
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <Image source={icons.Man} style={styles.logo} />
        </View>
        <Text style={styles.title}>Student Registration</Text>
      </View>

      {/* Added KeyboardAvoidingView for better UX on mobile */}
      <KeyboardAvoidingView
        style={{ flex: 1, width: '100%' }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
      >
        <ScrollView
          style={styles.formContainer}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.inputContainer}>
            <CustomSelectList
              data={parentsData.map(parent => ({ key: parent.id, value: parent.fatherName }))}
              selectedValue="Select Parent"
              onSelect={(val) => {
                setSelectedParentId(val);
                console.log("Selected ID:", val);
              }}
            />
            <Inputs placeholder="Student Name" value={formData.studentName} onChangeText={(text) => handleInputChange('studentName', text)} />
            <Inputs placeholder="User Name" value={formData.userName} onChangeText={(text) => handleInputChange('userName', text)} />
            <Inputs placeholder="Email" value={formData.email} onChangeText={(text) => handleInputChange('email', text)} />
            <Inputs placeholder="Password" secureTextEntry value={formData.password} onChangeText={(text) => handleInputChange('password', text)} />
            <Inputs placeholder="Confirm Password" secureTextEntry value={formData.confirmPassword} onChangeText={(text) => handleInputChange('confirmPassword', text)} />
            <Inputs placeholder="Phone" keyboardType="numeric" value={formData.phone} onChangeText={(text) => handleInputChange('phone', text)} />
            <Inputs placeholder="WhatsApp" value={formData.whatsapp} onChangeText={(text) => handleInputChange('whatsapp', text)} />
            <Inputs placeholder="Area" value={formData.area} onChangeText={(text) => handleInputChange('area', text)} />
            <Inputs placeholder="Address" value={formData.address} onChangeText={(text) => handleInputChange('address', text)} />
            <Inputs placeholder="Emergency Contact" value={formData.emergencyContact} onChangeText={(text) => handleInputChange('emergencyContact', text)} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <View style={styles.buttonContainer}>
        {loading ? (
          <ActivityIndicator size="large" color={colors.white} />
        ) : (
         
<TouchableOpacity style={styles.button} onPress={RegisterStudents}>
  <Text style={styles.button}>Register</Text>
</TouchableOpacity>
          
        )}
      </View>
    </View>
  );
};

export default AddStudentsScreen;

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
  },
  formContainer: {
    width: '100%',
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 100, // Add padding to ensure the button is not overlapped
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