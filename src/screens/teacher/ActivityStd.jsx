import React, { useContext, useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import Appbar from '../../components/Appbar';
import { colors } from '../../constant/Colors';
import icons from '../../constant/Icons';
import { useHome } from '../../context/HomeWorkContext';
import { LanguageContext } from '../../context/LanguageContext';
import CustomSelectList from '../../components/SelectList';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosInstance from '../../services/axiosInterceptor';
import Toast from 'react-native-toast-message';

const ActivityStd = ({ navigation, route }) => {
    const { language } = useContext(LanguageContext);
    const { student } = route.params || {};
    const { homeworkData, getHome, loading, error } = useHome();
    const [selectedHomework, setSelectedHomework] = useState(null);
    const [hasLoggedData, setHasLoggedData] = useState(false);
    const [status, setStatus] = useState('');
    const [suzish, setSuzish] = useState('');
    const [atkan, setAtkan] = useState('');
    const [galti, setGalti] = useState('');

    useEffect(() => {
        if (student?.studentId && !hasLoggedData) {
            getHome(student.studentId)
                .then(() => setHasLoggedData(true))
                .catch((err) => console.error('Error fetching homework data:', err));
        }
    }, [student, homeworkData, hasLoggedData]);

    const homeworkOptions = homeworkData?.map((item, index) => ({
        key: index.toString(),
        value: `${item.suratStartName} (Ayat ${item.startAyatNo} - ${item.endAyatNo})`,
        data: item,
    })) || [];

    const handleHomeworkSelect = (val) => {
        const selectedItem = homeworkOptions.find((option) => option.value === val);
        setSelectedHomework(selectedItem?.data || null);
    };

    const updateStatusHomeWork = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await axiosInstance.put('HomeWork/UpdateHomework', {
                id: selectedHomework?.id || null,
                suratStartName: selectedHomework.suratStartName,
                suratEndName: selectedHomework.suratEndName,
                suratStartNumber: selectedHomework.suratStartNumber,
                suratEndNumber: selectedHomework.suratEndNumber,
                startAyatNo: selectedHomework.startAyatNo,
                endAyatNo: selectedHomework.endAyatNo,
                studentId: selectedHomework.studentId,
                suzish,
                atkan,
                galti,
                type: selectedHomework.type,
                masjidId: selectedHomework.masjidId,
                status,
            }, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.status === 200 || response.status === 201) {
                Toast.show({
                    type: 'success',
                    text1: 'Homework updated successfully.',
                });
                navigation.goBack();
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Failed to update homework.',
                });
            }
        } catch (error) {
            console.error('Error updating homework:', error);
        }
    };

    const renderStatusButton = (label, value, setter, current) => (
        <TouchableOpacity
            style={styles.statusButton}
            onPress={() => setter(value)}
        >
            <Text style={[
                styles.statusButtonText,
                label === 'Pass' && { color: colors.green },
                label === 'Fail' && { color: colors.red },
                current === value && styles.activeButtonText
            ]}>
                {label}
            </Text>
        </TouchableOpacity>
    );

    const renderInputField = (value, setter) => (
        <TextInput
            style={styles.input}
            value={value}
            onChangeText={setter}
            keyboardType="numeric"
            placeholder="0"
        />
    );

    return (
        <View style={styles.container}>
            <Appbar title="Activity" onMenuPress={() => navigation.goBack()} />
            <View style={styles.header}>
                <Image source={icons.ActUser} style={styles.image} />
                <View style={styles.textContainer}>
                    <Text style={styles.name}>{student?.userName || 'Student'}</Text>
                </View>
            </View>

            <CustomSelectList
                data={homeworkOptions}
                selectedValue={selectedHomework ? `${selectedHomework.suratStartName} (Ayat ${selectedHomework.startAyatNo} - ${selectedHomework.endAyatNo})` : 'Select Homework'}
                onSelect={handleHomeworkSelect}
                placeholder={language === 'English' ? 'Select Homework' : 'ہوم ورک منتخب کریں'}
            />

            {selectedHomework && (
                <View style={styles.tableContainer}>
                    <View style={styles.tableRowHeader}>
                        <Text style={styles.tableHeader}>
                            {language === 'English' ? 'Category' : 'زمرہ'}
                        </Text>
                        <Text style={styles.tableHeader}>
                            {language === 'English' ? 'Value' : 'قدر'}
                        </Text>
                    </View>

                  

                    <View style={styles.tableRow}>
                        <Text style={styles.tableCell}>
                            {language === 'English' ? 'Suzish' : 'سوزش'}
                        </Text>
                        {renderInputField(suzish, setSuzish)}
                    </View>

                    <View style={styles.tableRow}>
                        <Text style={styles.tableCell}>
                            {language === 'English' ? 'Atkan' : 'اتکان'}
                        </Text>
                        {renderInputField(atkan, setAtkan)}
                    </View>

                    <View style={styles.tableRow}>
                        <Text style={styles.tableCell}>
                            {language === 'English' ? 'Galti' : 'گلتی'}
                        </Text>
                        {renderInputField(galti, setGalti)}
                    </View>

                    <View style={styles.tableRow}>
                        <Text style={styles.tableCell}>
                            {language === 'English' ? 'Status' : 'اسٹیٹس'}
                        </Text>
                        <View style={styles.statusContainer}>
                            {renderStatusButton('Pass', '1', setStatus, status)}
                            {renderStatusButton('Fail', '2', setStatus, status)}
                        </View>
                    </View>

                    <TouchableOpacity style={styles.updateButton} onPress={updateStatusHomeWork}>
                        <Text style={styles.updateButtonText}>
                            {language === 'English' ? 'Update' : 'اپ ڈیٹ کریں'}
                        </Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};

export default ActivityStd;

const styles = StyleSheet.create({
    container: { 
        backgroundColor: colors.PrimaryGreen, 
        flex: 1 
    },
    header: { 
        backgroundColor: colors.white, 
        padding: 10, 
        flexDirection: 'row', 
        alignItems: 'center' 
    },
    image: { 
        width: 100, 
        height: 100, 
        marginRight: 15 
    },
    name: { 
        fontWeight: '700', 
        fontSize: 18 
    },
    tableContainer: {
        margin: 10,
        backgroundColor: colors.white,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    tableRowHeader: {
        flexDirection: 'row',
        backgroundColor: '#f0f0f0',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    tableHeader: {
        flex: 1,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
        color: '#333',
    },
    tableRow: {
        flexDirection: 'row',
        paddingVertical: 10,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    tableCell: {
        flex: 1,
        textAlign: 'center',
        fontSize: 14,
        color: '#333',
    },
    statusButton: {
        flex: 1,
        paddingVertical: 8,
        alignItems: 'center',
    },
    statusButtonText: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    activeButtonText: {
        fontWeight: 'bold',
        textDecorationLine: 'underline',
    },
    updateButton: { 
        backgroundColor: colors.PrimaryGreen, 
        padding: 12, 
        margin: 50, 
        borderRadius: 10 
    },
    updateButtonText: { 
        textAlign: 'center', 
        color: colors.white, 
        fontSize: 18, 
        fontWeight: 'bold' 
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 5,
        marginHorizontal: 10,
        textAlign: 'center',
        fontSize: 14,
    },
    statusContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
});