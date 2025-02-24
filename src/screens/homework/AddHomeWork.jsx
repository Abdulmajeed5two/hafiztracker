import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Alert,
  TouchableOpacity,
} from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import DatePicker from 'react-native-date-picker';
import { colors } from '../../constant/Colors';
import Button from '../../constant/Buttons';
import icons from '../../constant/Icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosInstance from '../../services/axiosInterceptor';
import Toast from 'react-native-toast-message';
import CustomSelectList from '../../components/SelectList';
import { SuratContext } from '../../context/SuratContext';

const AddHomeWork = ({ navigation, route }) => {
  const { student } = route.params || {};

  const { suratData, loading } = useContext(SuratContext);
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [ayats, setAyats] = useState([]);

  const [formData, setFormData] = useState({
    suratStartName: '',
    suratEndName: '',
    suratStartNumber: 0,
    suratEndNumber: 0,
    startAyatNo: '',
    endAyatNo: '',
    endDate: selectedDate.toISOString(),
    studentId: student?.id ? Number(student.id) : null,
    type: '',
    masjidId: '',
  });

  useEffect(() => {
    if (!student || !student.id) {
      console.error('No Student Found:', student);
      Alert.alert('Error', 'No student information available.');
      navigation.goBack();
      return;
    }

    console.log('Student Data:', student);
    console.log('Student ID:', student.id);

    const fetchMasjidId = async () => {
      try {
        const masjidId = await AsyncStorage.getItem('masjidId');
        if (masjidId) {
          setFormData((prev) => ({ ...prev, masjidId: Number(masjidId) }));
        }
      } catch (error) {
        console.error('Error fetching masjidId:', error);
      }
    };
  
    fetchMasjidId();
  }, [student]);

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      endDate: selectedDate.toISOString(),
    }));
  }, [selectedDate]);

  const handleSuratStartSelect = (val) => {
    const selectedSurat = suratData.find((s) => s.suratName === val);
    if (selectedSurat) {
      setFormData((prev) => ({
        ...prev,
        suratStartName: val,
        suratStartNumber: selectedSurat.suratNumber,
      }));
    }
  };

  const handleSuratEndSelect = (val) => {
    const selectedSurat = suratData.find((s) => s.suratName === val);
    if (selectedSurat) {
      setFormData((prev) => ({
        ...prev,
        suratEndName: val,
        suratEndNumber: selectedSurat.suratNumber,
      }));
    }
  };

  const AssignHomeWork = async () => {
    const requiredFields = [
      'suratStartName',
      'suratEndName',
      'type',
      'startAyatNo',
      'endAyatNo',
    ];

    if (requiredFields.some((field) => !formData[field]) || !formData.studentId) {
      Toast.show({
        type : 'error',
        text1:'Please fill in all required fields'
      })
      return;
    }

    console.log('Form Data being sent:', formData);

    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axiosInstance.post('/HomeWork/AddHomeWork', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200 || response.status === 201) {
        Toast.show({
          type: 'success',
          text1: 'Home Work Assigned',
          text2: 'Home work has been assigned successfully!',
        });
        navigation.goBack();
      } else {
        throw new Error(response.data.message || 'Failed to assign homework');
      }
    } catch (error) {
      console.error('API Error:', error.response?.data || error.message);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error.response?.data?.message || 'Failed to assign homework. Please try again.',
      });
    }
  };

  useEffect(() => {
    if (formData.suratStartNumber) {
      getAyatbySuratnumber(formData.suratStartNumber);
    }
  }, [formData.suratStartNumber]);
  
  useEffect(() => {
    if (formData.suratEndNumber) {
      getAyatbySuratnumber(formData.suratEndNumber);
    }
  }, [formData.suratEndNumber]);

  const getAyatbySuratnumber = async (suratNumber) => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axiosInstance.post(
        `Ayat/GetAyatBySuratId?suratnumber=${suratNumber}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log('Ayat Response:', response.data.result.data); 
      setAyats(response.data.result.data || []); 
    } catch (error) {
      console.error('API Error:', error.response?.data || error.message);
      setAyats([]); // Also reset on error
    }
  };
  

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  if (loading) return <Text>Loading...</Text>;

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
              { key: '3', value: 'Sabqi' },
            ]}
            selectedValue={formData.type || 'Select Type'}
            onSelect={(val) => handleInputChange('type', val)}
          />

          {formData.type && (
            <>
              <TouchableOpacity
                style={styles.dateInput}
                onPress={() => setOpenDatePicker(true)}
              >
                <Text style={styles.dateText}>
                  {selectedDate.toLocaleDateString()}
                </Text>
              </TouchableOpacity>
<View style={styles.datePickerContainer}>
              <DatePicker
                modal
                open={openDatePicker}
                date={selectedDate}
                onConfirm={(date) => {
                  setOpenDatePicker(false);
                  setSelectedDate(date);
                }}
                onCancel={() => setOpenDatePicker(false)}
                minimumDate={new Date()}
                style={styles.datepicker}
                />
                </View>

              <CustomSelectList
                data={suratData.map((surat) => ({
                  key: surat.suratName,
                  value: surat.suratName,
                }))}
                selectedValue={formData.suratStartName || 'Select Start Surah'}
                onSelect={handleSuratStartSelect}
              />

              <CustomSelectList
                data={suratData.map((surat) => ({
                  key: surat.suratName,
                  value: surat.suratName,
                }))}
                selectedValue={formData.suratEndName || 'Select End Surah'}
                onSelect={handleSuratEndSelect}
              />

<CustomSelectList
  data={(Array.isArray(ayats) ? ayats : []).map((ayat) => ({
    key: `${ayat.number}`,
    value: `${ayat.text}`,
  }))}
  selectedValue={formData.startAyatNo || 'Select Start Ayah'}
  onSelect={(val) => handleInputChange('startAyatNo', val)}
/>

<CustomSelectList
  data={(Array.isArray(ayats) ? ayats : []).map((ayat) => ({
    key: `${ayat.number}`,
    value: `${ayat.text}`,
  }))}
  selectedValue={formData.endAyatNo || 'Select End Ayah'}
  onSelect={(val) => handleInputChange('endAyatNo', val)}
/>

            </>
          )}
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <Button title="Assign Home Work" onPress={AssignHomeWork} />
      </View>

      <Toast />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.PrimaryGreen,
    paddingHorizontal: 20,
  },
  header: {
    margin: 8,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
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
    marginTop: 10,
  },
  datePickerContainer:{
    width: '100%',
    height: 50,
    backgroundColor: colors.white,
    justifyContent: 'center',
  },
  datepicker:{
    
  }

});

export default AddHomeWork;
