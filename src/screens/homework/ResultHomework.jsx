import React, { useContext, useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import Appbar from '../../components/Appbar';
import { colors } from '../../constant/Colors';
import icons from '../../constant/Icons';
import { useHome } from '../../context/HomeWorkContext';
import { LanguageContext } from '../../context/LanguageContext';
import CustomSelectList from '../../components/SelectList';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ResultHomework = ({ navigation }) => {
    const { language } = useContext(LanguageContext);
    const { homeworkData, getHome, loading, error } = useHome();
    const [selectedHomework, setSelectedHomework] = useState(null);
    const [hasLoggedData, setHasLoggedData] = useState(false);
    const [studentId, setStudentId] = useState(null);
    const [userName, setUserName] = useState('');

    const getUsernameFromStorage = async () => {
        try {
            const storedUsername = await AsyncStorage.getItem('userName');
            if (storedUsername !== null) {
                setUserName(storedUsername);
            }
        } catch (error) {
            console.error('Error retrieving username:', error);
        }
    };

    useEffect(() => {
        const fetchStudentId = async () => {
            try {
                const storedStudentId = await AsyncStorage.getItem('studentId');
                if (storedStudentId) {
                    setStudentId(storedStudentId);
                }
            } catch (error) {
                console.error('Error fetching student ID from AsyncStorage:', error);
            }
        };
        getUsernameFromStorage();
        fetchStudentId();
    }, []);

    useEffect(() => {
        if (studentId && !hasLoggedData) {
            getHome(studentId)
                .then(() => setHasLoggedData(true))
                .catch((err) => console.error('Error fetching homework data:', err));
        }
    }, [studentId, homeworkData, hasLoggedData]);

    const homeworkOptions = homeworkData?.map((item, index) => ({
        key: index.toString(),
        value: `${item.suratStartName} (Ayat ${item.startAyatNo} - ${item.endAyatNo})`,
        data: item,
    })) || [];

    const handleHomeworkSelect = (val) => {
        const selectedItem = homeworkOptions.find((option) => option.value === val);
        setSelectedHomework(selectedItem?.data || null);
    };

    const getStatusText = (statusValue) => {
        switch (statusValue) {
            case 1:
            case '1':
                return 'Pass';
            case 2:
            case '2':
                return 'Fail';
            default:
                return 'Pending';
        }
    };

    return (
        <View style={styles.container}>
            <Appbar title="Home Work Result" onMenuPress={() => navigation.goBack()} />
            <View style={styles.header}>
                <Image source={icons.ActUser} style={styles.image} />
                <View style={styles.textContainer}>
                    <Text style={styles.name}>{userName}</Text>
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
                        <Text style={styles.tableCell}>
                            {selectedHomework.suzish || '0'}
                        </Text>
                    </View>

                    <View style={styles.tableRow}>
                        <Text style={styles.tableCell}>
                            {language === 'English' ? 'Atkan' : 'اتکان'}
                        </Text>
                        <Text style={styles.tableCell}>
                            {selectedHomework.atkan || '0'}
                        </Text>
                    </View>

                    <View style={styles.tableRow}>
                        <Text style={styles.tableCell}>
                            {language === 'English' ? 'Galti' : 'گلتی'}
                        </Text>
                        <Text style={styles.tableCell}>
                            {selectedHomework.galti || '0'}
                        </Text>
                    </View>

                    <View style={styles.tableRow}>
                        <Text style={styles.tableCell}>
                            {language === 'English' ? 'Status' : 'اسٹیٹس'}
                        </Text>
                        <Text style={[
                            styles.tableCell,
                            { 
                                color: selectedHomework.status === 1 || selectedHomework.status === '1' ? colors.green : 
                                      selectedHomework.status === 2 || selectedHomework.status === '2' ? colors.red : '#333'
                            }
                        ]}>
                            {getStatusText(selectedHomework.status)}
                        </Text>
                    </View>
                </View>
            )}
        </View>
    );
};

export default ResultHomework;

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
    },
    tableRowHeader: {
        flexDirection: 'row',
        paddingVertical: 12,
        borderBottomWidth: 1,
    },
    tableHeader: {
        flex: 1,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
    },
    tableRow: {
        flexDirection: 'row',
        paddingVertical: 10,
        alignItems: 'center',
        borderBottomWidth: 1,
    },
    tableCell: {
        flex: 1,
        textAlign: 'center',
        fontSize: 14,
    },
});