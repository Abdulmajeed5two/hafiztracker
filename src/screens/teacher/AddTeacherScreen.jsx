import { Image, StyleSheet, Text, View, Alert, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import Inputs from '../../constant/Inputs';
import { colors } from '../../constant/Colors';
import Button from '../../constant/Buttons';
import icons from '../../constant/Icons';
import CustomDropdown from '../../components/CustomDropdown';
import axiosInstance from '../../services/axiosInterceptor';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DocumentPicker from 'react-native-document-picker';

const AddTeacherScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    userName: '',
    teacherName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    whatsApp: '',
    area: '',
    address: '',
    gender: '',
    cnic: '',
    refernceName: '',
    referencePhone: '',
    masjidId: '',
    ProfileImage: null,
    Attachment: null,
  });

  const [profileImageUri, setProfileImageUri] = useState(null);
  const [attachmentName, setAttachmentName] = useState(null);

  const genderOptions = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
    { label: 'Other', value: 'other' },
  ];

  useEffect(() => {
    const getMasjidId = async () => {
      try {
        const masjidId = await AsyncStorage.getItem('id');
        console.log('skdjsdksdskd',masjidId)
        if (masjidId) {
          setFormData((prev) => ({ ...prev, masjidId }));
        }
      } catch (error) {
        console.error('Error fetching masjidId:', error);
      }
    };
    getMasjidId();
  }, []);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleProfileImage = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      
      setProfileImageUri(res[0].uri);
      setFormData((prev) => ({ ...prev, ProfileImage: res[0] }));
      
      Toast.show({
        type: 'success',
        text1: 'Profile Image Selected',
        text2: 'Profile image has been selected successfully!',
      });
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User canceled profile image picker');
      } else {
        console.error('Profile image picker error:', err);
      }
    }
  };

  const handleAttachment = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf, DocumentPicker.types.plainText, DocumentPicker.types.images],
      });
      
      setAttachmentName(res[0].name);
      setFormData((prev) => ({ ...prev, Attachment: res[0] }));
      
      Toast.show({
        type: 'success',
        text1: 'Attachment Selected',
        text2: 'Attachment has been selected successfully!',
      });
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User canceled attachment picker');
      } else {
        console.error('Attachment picker error:', err);
      }
    }
  };

  const RegisterTeacher = async () => {
    if (!formData.userName || !formData.teacherName || !formData.email || !formData.password || !formData.masjidId) {
      Alert.alert('Error', 'Please fill all required fields including Masjid ID.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    try {
      const token = await AsyncStorage.getItem('token');
      const formDataToSend = new FormData();
      
      Object.keys(formData).forEach(key => {
        if (key !== 'ProfileImage' && key !== 'Attachment') {
          formDataToSend.append(key, formData[key]);
        }
      });

      if (formData.ProfileImage) {
        formDataToSend.append('ProfileImage', {
          uri: formData.ProfileImage.uri,
          type: formData.ProfileImage.type,
          name: formData.ProfileImage.name,
        });
      }

      if (formData.Attachment) {
        formDataToSend.append('Attachment', {
          uri: formData.Attachment.uri,
          type: formData.Attachment.type,
          name: formData.Attachment.name,
        });
      }

      const response = await axiosInstance.post('/Teacher/RegisterTeacher', formDataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      
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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconContainer} onPress={handleProfileImage}>
          <Image 
            source={profileImageUri ? { uri: profileImageUri } : icons.Teacher} 
            style={styles.logo} 
          />
        </TouchableOpacity>
        <Text style={styles.title}>Teacher Registration</Text>
      </View>

      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.formContainer}>
          <Inputs
            placeholder="Teacher Name"
            value={formData.teacherName}
            onChangeText={(text) => handleInputChange('teacherName', text)}
          />
          <Inputs
            placeholder="Username"
            value={formData.userName}
            onChangeText={(text) => handleInputChange('userName', text)}
          />
          <Inputs
            placeholder="Email"
            value={formData.email}
            onChangeText={(text) => handleInputChange('email', text)}
          />
          <Inputs
            placeholder="Password"
            secureTextEntry
            value={formData.password}
            onChangeText={(text) => handleInputChange('password', text)}
          />
          <Inputs
            placeholder="Confirm Password"
            secureTextEntry
            value={formData.confirmPassword}
            onChangeText={(text) => handleInputChange('confirmPassword', text)}
          />
          <Inputs
            placeholder="Phone"
            value={formData.phone}
            onChangeText={(text) => handleInputChange('phone', text)}
          />
          <Inputs
            placeholder="WhatsApp"
            value={formData.whatsApp}
            onChangeText={(text) => handleInputChange('whatsApp', text)}
          />
          <Inputs
            placeholder="Area"
            value={formData.area}
            onChangeText={(text) => handleInputChange('area', text)}
          />
          <Inputs
            placeholder="Address"
            value={formData.address}
            onChangeText={(text) => handleInputChange('address', text)}
          />
          <CustomDropdown
            data={genderOptions}
            placeholder="Select Gender"
            onSelect={(item) => handleInputChange('gender', item.value)}
          />
          <Inputs
            placeholder="CNIC No"
            value={formData.cnic}
            onChangeText={(text) => handleInputChange('cnic', text)}
          />
          <Inputs
            placeholder="Reference Name"
            value={formData.refernceName}
            onChangeText={(text) => handleInputChange('refernceName', text)}
          />
          <Inputs
            placeholder="Reference Phone No"
            value={formData.referencePhone}
            onChangeText={(text) => handleInputChange('referencePhone', text)}
          />
          <TouchableOpacity style={styles.attachmentButton} onPress={handleAttachment}>
            <Text style={styles.attachmentText}>
              {attachmentName || 'Upload Attachment (PDF/Image)'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <Button title="Register Now" onPress={RegisterTeacher} />
      </View>

      <Toast />
    </View>
  );
};

export default AddTeacherScreen;

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
    overflow: 'hidden',
  },
  logo: {
    width: '80%',
    height: '80%',
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
  scrollContainer: {
    flex: 1,
    width: '100%',
  },
  scrollContent: {
    paddingBottom: 100,
  },
  formContainer: {
    width: '100%',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    paddingHorizontal: 20,
  },
  attachmentButton: {
    backgroundColor: colors.white,
    padding: 15,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  attachmentText: {
    color: colors.PrimaryGreen,
    fontSize: 16,
  },
});