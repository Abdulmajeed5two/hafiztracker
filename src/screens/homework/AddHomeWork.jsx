import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
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

const ITEMS_PER_PAGE = 15;

const AddHomeWork = ({ navigation, route }) => {
  const { student } = route.params || {};
  const { suratData, loading } = useContext(SuratContext);

  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [ayats, setAyats] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [typePage, setTypePage] = useState(1);
  const [suratStartPage, setSuratStartPage] = useState(1);
  const [suratEndPage, setSuratEndPage] = useState(1);
  const [startAyatPage, setStartAyatPage] = useState(1);
  const [endAyatPage, setEndAyatPage] = useState(1);

  const [formData, setFormData] = useState({
    suratStartName: '',
    suratEndName: '',
    suratStartNumber: 0,
    suratEndNumber: 0,
    startAyatNo: '',
    endAyatNo: '',
    endDate: selectedDate.toISOString(),
    studentId: student?.studentId ? Number(student.studentId) : null,
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
        type: 'error',
        text1: 'Please fill in all required fields',
      });
      return;
    }

    setIsSubmitting(true);
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
        text2: error.response?.data?.message || 'Failed to assign homework.',
      });
    } finally {
      setIsSubmitting(false);
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
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setAyats(response.data.result.data || []);
    } catch (error) {
      console.error('API Error:', error.response?.data || error.message);
      setAyats([]);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const typeOptions = [
    { key: '1', value: 'Sabaq' },
    { key: '2', value: 'Manzil' },
    { key: '3', value: 'Sabqi' },
  ].slice(0, typePage * ITEMS_PER_PAGE);

  const suratOptions = suratData
    .map((surat) => ({
      key: surat.suratName,
      value: surat.suratName,
    }))
    .slice(0, suratStartPage * ITEMS_PER_PAGE);

  const suratEndOptions = suratData
    .map((surat) => ({
      key: surat.suratName,
      value: surat.suratName,
    }))
    .slice(0, suratEndPage * ITEMS_PER_PAGE);

  const ayatOptions = (Array.isArray(ayats) ? ayats : [])
    .map((ayat) => ({
      key: `${ayat.number}`,
      value: `${ayat.text}`,
    }))
    .slice(0, startAyatPage * ITEMS_PER_PAGE);

  const endAyatOptions = (Array.isArray(ayats) ? ayats : [])
    .map((ayat) => ({
      key: `${ayat.number}`,
      value: `${ayat.text}`,
    }))
    .slice(0, endAyatPage * ITEMS_PER_PAGE);

  const loadMore = (dropdownType) => {
    switch (dropdownType) {
      case 'type':
        if (typePage * ITEMS_PER_PAGE < 3) setTypePage((prev) => prev + 1);
        break;
      case 'suratStart':
        if (suratStartPage * ITEMS_PER_PAGE < suratData.length)
          setSuratStartPage((prev) => prev + 1);
        break;
      case 'suratEnd':
        if (suratEndPage * ITEMS_PER_PAGE < suratData.length)
          setSuratEndPage((prev) => prev + 1);
        break;
      case 'startAyat':
        if (startAyatPage * ITEMS_PER_PAGE < ayats.length)
          setStartAyatPage((prev) => prev + 1);
        break;
      case 'endAyat':
        if (endAyatPage * ITEMS_PER_PAGE < ayats.length)
          setEndAyatPage((prev) => prev + 1);
        break;
      default:
        break;
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.white} />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <Image source={icons.MasjidIcon} style={styles.logo} />
        </View>
        <Text style={styles.title}>Assign Home Work</Text>
      </View>

      <ScrollView style={styles.formContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.inputContainer}>
          <CustomSelectList
            data={typeOptions}
            selectedValue={formData.type || 'Select Type'}
            onSelect={(val) => handleInputChange('type', val)}
            onEndReached={() => loadMore('type')}
            maxItems={typeOptions.length}
          />

          {formData.type && (
            <>
              <TouchableOpacity
                style={styles.dateButton}
                onPress={() => setOpenDatePicker(true)}
              >
                <Text style={styles.dateButtonText}>
                  {selectedDate.toLocaleDateString()}
                </Text>
                <Image source={icons.CalendarIcon} style={styles.calendarIcon} />
              </TouchableOpacity>

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
                mode="date"
                theme="light"
              />

              <CustomSelectList
                data={suratOptions}
                selectedValue={formData.suratStartName || 'Select Start Surah'}
                onSelect={handleSuratStartSelect}
                onEndReached={() => loadMore('suratStart')}
                maxItems={suratData.length}
              />

              <CustomSelectList
                data={suratEndOptions}
                selectedValue={formData.suratEndName || 'Select End Surah'}
                onSelect={handleSuratEndSelect}
                onEndReached={() => loadMore('suratEnd')}
                maxItems={suratData.length}
              />

              <CustomSelectList
                data={ayatOptions}
                selectedValue={formData.startAyatNo || 'Select Start Ayah'}
                onSelect={(val) => handleInputChange('startAyatNo', val)}
                onEndReached={() => loadMore('startAyat')}
                maxItems={ayats.length}
              />

              <CustomSelectList
                data={endAyatOptions}
                selectedValue={formData.endAyatNo || 'Select End Ayah'}
                onSelect={(val) => handleInputChange('endAyatNo', val)}
                onEndReached={() => loadMore('endAyat')}
                maxItems={ayats.length}
              />
            </>
          )}
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <Button
          title={isSubmitting ? '' : 'Assign Home Work'}
          onPress={AssignHomeWork}
          disabled={isSubmitting}
          style={isSubmitting ? styles.disabledButton : null}
          children={
            isSubmitting ? (
              <ActivityIndicator size="small" color={colors.white} />
            ) : null
          }
        />
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    overflow: 'hidden',
  },
  logo: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.white,
  },
  formContainer: {
    flex: 1,
  },
  inputContainer: {
    paddingBottom: 20,
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: 12,
    borderRadius: 8,
    marginVertical: 10,
    elevation: 2,
  },
  dateButtonText: {
    flex: 1,
    fontSize: 16,
    color: colors.black,
  },
  calendarIcon: {
    width: 24,
    height: 24,
    tintColor: colors.PrimaryGreen,
  },
  buttonContainer: {
    paddingVertical: 20,
  },
  disabledButton: {
    backgroundColor: colors.LightGreen,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.PrimaryGreen,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: colors.white,
  },
});

export default AddHomeWork;