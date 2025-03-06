import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import axiosInstance from '../../services/axiosInterceptor';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Appbar from '../../components/Appbar';
import { colors } from '../../constant/Colors';
import { LanguageContext } from '../../context/LanguageContext';

const HomeWorkByType = ({ navigation, route }) => {
    const {language} = useContext(LanguageContext);
    const { selectedType } = route.params;
    const [studentId, setStudentId] = useState(null);
    const [homeWorkData, setHomeWorkData] = useState([]);

    useEffect(() => {
        fetchData();
    }, [selectedType]);

    const fetchData = async () => {
        try {
            const storedStudentId = await AsyncStorage.getItem('studentId');
            if (storedStudentId) {
                setStudentId(storedStudentId);
            }

            if (storedStudentId && selectedType) {
                const token = await AsyncStorage.getItem('token');
                const response = await axiosInstance.post('HomeWork/GetHomeWorkActivity', {
                    studentId: storedStudentId,
                    type: selectedType,
                }, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                console.log('Homework Data:', response.data.result.data);
                setHomeWorkData(response.data.result.data);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const renderHeader = () => (
        <View style={[styles.row, styles.headerRow]}>
            <View style={styles.column}>
                <Text style={styles.headerText}>{language === 'English' ? 'Surat Name':'سورت کا نام'}</Text>
            </View>
            <View style={styles.column}>
                <Text style={styles.headerText}>{language === 'English' ? 'Suzish':'سوزش'}</Text>
            </View>
            <View style={styles.column}>
                <Text style={styles.headerText}>{language === 'English' ? 'Atkan':'اتکن'}</Text>
            </View>
            <View style={styles.column}>
                <Text style={styles.headerText}>{language === 'English' ? 'Galti':'گلتی'}</Text>
            </View>
            <View style={styles.column}>
                <Text style={styles.headerText}>{language === 'English' ? 'Status':'درجہ'}</Text>
            </View>
        </View>
    );

    const renderItem = ({ item }) => (
        <View style={styles.row}>
            <View style={styles.column}>
                <Text style={styles.columnText}>{item.suratStartName}</Text>
            </View>
            <View style={styles.column}>
                <Text style={styles.columnText}>{item.suzish}</Text>
            </View>
            <View style={styles.column}>
                <Text style={styles.columnText}>{item.atkan}</Text>
            </View>
            <View style={styles.column}>
                <Text style={styles.columnText}>{item.galti}</Text>
            </View>
            <View style={styles.column}>
                <Text style={[
                    styles.columnText,
                    { color: item.status === 1 ? 'green' : 'red' }
                ]}>
                    {item.status === 1 ? 'Pass' : item.status === 2 ? 'Fail' : item.status}
                </Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <Appbar 
                title={language === 'English' ? 'Home Work Result':'ہوم ورک کا نتیجہ'}
                onMenuPress={() => navigation.goBack()}
            />
            <FlatList
                data={homeWorkData}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                contentContainerStyle={styles.listContainer}
                ListHeaderComponent={renderHeader}
            />
        </View>
    );
};

export default HomeWorkByType;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
   
    row: {
        flexDirection: 'row',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    headerRow: {
        backgroundColor: colors.PrimaryGreen,
        borderBottomWidth: 2,
        borderBottomColor: '#666',
    },
    column: {
        flex: 1,
        paddingHorizontal: 8,
    },
    columnText: {
        fontSize: 15,
        color: colors.overlay,
    },
    headerText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: colors.white,
    },
});