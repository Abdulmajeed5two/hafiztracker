import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import Appbar from '../../components/Appbar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosInstance from '../../services/axiosInterceptor';

const HomeworkDetails = ({ navigation, route }) => {
    const { homework } = route.params;
    const [ayats, setAyats] = useState([]);
    const suratnumber = homework.suratStartNumber;

    useEffect(() => {
        if (suratnumber) {
            getAyats(suratnumber);
        }
    }, [suratnumber]);

    const getAyats = async (suratnumber) => {
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await axiosInstance.post(
                `/Ayat/GetAyatBySuratId?suratnumber=${suratnumber}`,
                {},
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
            setAyats(response.data.result.data);
            console.log('response', response.data);
        } catch (error) {
            console.error('Error fetching ayats:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Appbar
                title="HOME WORK DETAILS"
                onMenuPress={() => navigation.goBack()}
                onNotifyPress={() => console.log('Notification Pressed')}
            />
            <ScrollView contentContainerStyle={styles.contentContainer}>
                {ayats.length > 0 ? (
                    ayats.map((ayat, index) => (
                        <Text key={index} style={styles.ayatText}>
                            {ayat.text}
                        </Text>
                    ))
                ) : (
                    <Text style={styles.noAyatText}>Not Found</Text> 
                )}
            </ScrollView>
        </View>
    );
};

export default HomeworkDetails;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    contentContainer: {
        padding: 16,
    },
    ayatText: {
        fontSize: 20, 
        fontFamily: 'Scheherazade',
        textAlign: 'right',
        writingDirection: 'rtl',
        marginBottom: 12, 
        lineHeight: 40,
        color: '#000',
    },
    noAyatText: {
        fontSize: 16,
        textAlign: 'right',
        writingDirection: 'rtl',
        color: '#666',
    },
});