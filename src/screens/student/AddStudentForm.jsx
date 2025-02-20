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

const AddStudentForm = ({navigation}) => {
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
      })
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
        if (!formData.studentName || !formData.userName || !formData.email || !formData.password) {
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
          const response = await axiosInstance.post('/Student/RegisterStudent', formData, {
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
              <Image source={icons.Man} style={styles.logo} />
            </View>
            <Text style={styles.title}>Student Registration</Text>
          </View>
    
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

export default AddStudentForm

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
        paddingBottom: 100,
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
})