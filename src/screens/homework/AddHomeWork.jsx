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
import React, { useState, useEffect, useContext, useCallback } from 'react';
import DatePicker from 'react-native-date-picker';
import { colors } from '../../constant/Colors';
import Button from '../../constant/Buttons';
import icons from '../../constant/Icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosInstance from '../../services/axiosInterceptor';
import Toast from 'react-native-toast-message';
import CustomSelectList from '../../components/SelectList';
import { SuratContext } from '../../context/SuratContext';
import { LanguageContext } from '../../context/LanguageContext';

const ITEMS_PER_PAGE = 30;

const AddHomeWork = ({ navigation, route }) => {
  const { language } = useContext(LanguageContext);
  const { student } = route.params || {};
  const { suratData, loading } = useContext(SuratContext);

  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [ayats, setAyats] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [page, setPage] = useState(1);
  const [displayedSuratData, setDisplayedSuratData] = useState([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

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
    if (suratData && suratData.length > 0) {
      loadMoreItems();
    }
  }, [suratData]);

  const loadMoreItems = useCallback(() => {
    if (!suratData || loading) return;

    setIsLoadingMore(true);
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = page * ITEMS_PER_PAGE;
    const newItems = suratData.slice(0, endIndex);

    setDisplayedSuratData(newItems);
    setIsLoadingMore(false);
  }, [page, suratData, loading]);

  const handleScroll = ({ nativeEvent }) => {
    const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;
    const paddingToBottom = 20;

    if (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    ) {
      if (!isLoadingMore && displayedSuratData.length < suratData.length) {
        setPage(prev => prev + 1);
      }
    }
  };

  useEffect(() => {
    loadMoreItems();
  }, [page, loadMoreItems]);

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
  ];

  const suratOptions = displayedSuratData.map((surat) => ({
    key: surat.suratName,
    value: surat.suratName,
  }));

  const suratEndOptions = displayedSuratData.map((surat) => ({
    key: surat.suratName,
    value: surat.suratName,
  }));

  const ayatOptions = (Array.isArray(ayats) ? ayats : []).map((ayat) => ({
    key: `${ayat.number}`,
    value: `${ayat.number}`,
  }));

  const endAyatOptions = (Array.isArray(ayats) ? ayats : []).map((ayat) => ({
    key: `${ayat.number}`,
    value: `${ayat.number}`,
  }));

  if (loading && page === 1) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.white} />
        <Text style={styles.loadingText}>{language === 'English' ? 'Loading...' : 'لوڈ ہو رہا ہے...'}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <Image source={icons.MasjidIcon} style={styles.logo} />
        </View>
        <Text style={styles.title}>{language === 'English' ? 'Assign Home Work' : 'ہوم ورک تفویض کریں'}</Text>
      </View>

      <ScrollView 
        style={styles.formContainer} 
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        <View style={styles.inputContainer}>
          <CustomSelectList
            data={typeOptions}
            selectedValue={formData.type || language === 'English' ? 'Select Type' : 'قسم منتخب کریں'}
            onSelect={(val) => handleInputChange('type', val)}
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
              />

              <CustomSelectList
                data={ayatOptions}
                selectedValue={formData.startAyatNo || 'Select Start Ayah'}
                onSelect={(val) => handleInputChange('startAyatNo', val)}
              />

              <CustomSelectList
                data={suratEndOptions}
                selectedValue={formData.suratEndName || 'Select End Surah'}
                onSelect={handleSuratEndSelect}
              />

              <CustomSelectList
                data={endAyatOptions}
                selectedValue={formData.endAyatNo || language === 'English' ? 'Select End Ayah' : 'آخر آیت کو منتخب کریں'}
                onSelect={(val) => handleInputChange('endAyatNo', val)}
              />
            </>
          )}
        </View>

        {isLoadingMore && (
          <View style={styles.loadingMoreContainer}>
            <ActivityIndicator size="small" color={colors.white} />
            <Text style={styles.loadingMoreText}>
              {language === 'English' ? 'Loading more...' : 'مزید لوڈ ہو رہا ہے...'}
            </Text>
          </View>
        )}
      </ScrollView>

      <View style={styles.buttonContainer}>
        <Button
          title={isSubmitting ? '' : language === 'English' ? 'Assign Home Work' : 'ہوم ورک تفویض کریں'}
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
  loadingMoreContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  loadingMoreText: {
    marginLeft: 10,
    color: colors.white,
    fontSize: 14,
  },
});

export default AddHomeWork;