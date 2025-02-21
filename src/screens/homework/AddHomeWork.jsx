import { Image, StyleSheet, Text, View, ScrollView, Alert } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import { colors } from '../../constant/Colors';
import Button from '../../constant/Buttons';
import icons from '../../constant/Icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosInstance from '../../services/axiosInterceptor';
import Toast from 'react-native-toast-message';
import CustomSelectList from '../../components/SelectList';
import { SuratContext } from '../../context/SuratContext';

const AddHomeWork = ({ navigation,route }) => {
  const { student } = route.params;
  const {suratData} = useContext(SuratContext);
  const [formData, setFormData] = useState({
    suratStartName: '',
    suratEndName: '',
    suratStartNumber: '',
    suratEndNumber: '',
    startAyatNo: '',
    endAyatNo: '',
    endDate: '',
    studentId: '',
    type: '',
    masjidId: '',
  });


  useEffect(() => {
    const fetchMasjidId = async () => {
      const masjidId = await AsyncStorage.getItem('masjidId');
      if (masjidId) {
        setFormData((prev) => ({ ...prev, masjidId }));
      }
    };
    console.log('Student:', fetchMasjidId);
    fetchMasjidId();
  }, []);

  const AssignHomeWork = async () => {
    if (!formData.suratStartName || !formData.suratEndName || !formData.email || !formData.password) {
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
          <Image source={icons.MasjidIcon} style={styles.logo} />
        </View>
        <Text style={styles.title}>Home Work</Text>
      </View>

      <ScrollView style={styles.formContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.inputContainer}>
    
    <CustomSelectList
  data={[
    { key: '1', value: 'Sabaq' },
    { key: '2', value: 'Manzil' },
    { key: '3', value: 'Sabqi' }
  ]}
  selectedValue="Select Type"
  onSelect={(val) => console.log("Selected:", val)}
/>
<CustomSelectList
  data={[
    { key: '1', value: 'Khan' },
    { key: '2', value: 'hameed' },
    { key: '3', value: 'hakim' },
  ]}
  selectedValue="Select Student"
  onSelect={(val) => console.log("Selected:", val)}
/>
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <Button title="Assign Home Work" onPress={AssignHomeWork} />
      </View>

      <Toast />
    </View>
  );
};

export default AddHomeWork;

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
