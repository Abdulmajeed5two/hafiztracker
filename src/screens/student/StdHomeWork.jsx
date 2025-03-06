import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import Appbar from '../../components/Appbar';
import axiosInstance from '../../services/axiosInterceptor';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LanguageContext } from '../../context/LanguageContext';

const StdHomeWork = ({ navigation }) => {
    const { language } = useContext(LanguageContext);
    const [homeworkData, setHomeworkData] = useState([]);

    const getStdHomework = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const stdId = await AsyncStorage.getItem('studentId');
            const response = await axiosInstance.post(
                'HomeWork/GetHomeWork',
                { studentId: stdId },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                }
            );
            const result = Array.isArray(response.data.result.data)
                ? response.data.result.data
                : response.data.result.data
                ? [response.data.result.data]
                : [];
            setHomeworkData(result);
            console.log('homeworkdata...', result);
        } catch (error) {
            console.log('error', error);
            setHomeworkData([]);
        }
    };

    useEffect(() => {
        getStdHomework();
    }, []);

    const handleViewDetails = (homework) => {
        navigation.navigate('homeworkdetails', { homework });
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Appbar
                    title={language === 'English' ? 'Homework' : 'ہوم ورک'}
                    onMenuPress={() => navigation.goBack()}
                    onNotifyPress={() => console.log('Notification Pressed')}
                />
            </View>

            <View style={styles.tableHeaderContainer}>
                <View style={styles.tableHeader}>
                    <Text style={styles.headerText}>
                        {language === 'English' ? 'Date' : 'تاریخ'}
                    </Text>
                    <Text style={styles.headerText}>
                        {language === 'English' ? 'Surah' : 'سورہ'}
                    </Text>
                    <Text style={styles.headerText}>
                        {language === 'English' ? 'Detail' : 'تفصیل'}
                    </Text>
                </View>
            </View>
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContainer}
            >
                {homeworkData.length > 0 ? (
                    homeworkData.map((homework) => (
                        <View key={homework.id} style={styles.tableRow}>
                            <Text style={styles.rowText}>
                                {new Date(homework.createdAt).toLocaleDateString()}
                            </Text>
                            <Text style={styles.rowText}>
                                {homework.suratStartName} - {homework.suratEndName}
                            </Text>
                            <TouchableOpacity
                                style={styles.rowButton}
                                onPress={() => handleViewDetails(homework)}
                            >
                                <Text style={styles.rowText}>View</Text>
                            </TouchableOpacity>
                        </View>
                    ))
                ) : (
                    <Text style={styles.noDataText}>No homework available</Text>
                )}
            </ScrollView>
        </View>
    );
};

export default StdHomeWork;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    headerContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 2,
    },
    tableHeaderContainer: {
        position: 'absolute',
        top: 60,
        left: 0,
        right: 0,
        zIndex: 1,
    },
    tableHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#4CAF50',
        paddingVertical: 12,
        paddingHorizontal: 8,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },
    headerText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
        flex: 1,
        textAlign: 'center',
    },
    scrollView: {
        flex: 1,
        marginTop: 100, 
    },
    scrollContainer: {
        paddingHorizontal: 16,
        paddingBottom: 16,
    },
    tableRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        paddingVertical: 12,
        paddingHorizontal: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    rowText: {
        fontSize: 14,
        color: '#333',
        flex: 1,
        textAlign: 'center',
    },
    rowButton: {
        flex: 1,
        alignItems: 'center',
    },
    noDataText: {
        textAlign: 'center',
        fontSize: 16,
        marginTop: 20,
        color: '#777',
    },
});