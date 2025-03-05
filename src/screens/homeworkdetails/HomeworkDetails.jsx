import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, ImageBackground } from 'react-native';
import Appbar from '../../components/Appbar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosInstance from '../../services/axiosInterceptor';
import icons from '../../constant/Icons';
import { colors } from '../../constant/Colors';
import { width, height } from '../../constant/Size';

const HomeworkDetails = ({ navigation, route }) => {
    const { homework } = route.params;
    const [sabaq, setSabaq] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const getSabaq = async () => {
        setIsLoading(true);
        try {
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                throw new Error('No authentication token found');
            }

            const response = await axiosInstance.post(
                'Ayat/GetSabaq',
                {
                    startAyatNumber: homework.startAyatNo,
                    startSuratNumber: homework.suratStartNumber,
                    endAyatNumber: homework.endAyatNo,
                    endSuratNumber: homework.suratEndNumber,
                    pageSize: 10,
                    pageNumber: 1
                },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

            const data = response.data.result?.data || [];
            setSabaq(data);
            console.log('Sabaq data:', data);
        } catch (error) {
            console.error('Error fetching sabaq:', {
                message: error.message,
                status: error.response?.status,
                data: error.response?.data
            });
            setSabaq([]); // Reset sabaq on error
        } finally {
            setIsLoading(false); 
        }
    };

    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            if (isMounted) {
                await getSabaq();
            }
        };

        fetchData();
        return () => {
            isMounted = false;
        };
    }, [homework]);


    return (
        <View style={styles.container}>
            <Appbar
                title="HOME WORK DETAILS"
                onMenuPress={() => navigation.goBack()}
                onNotifyPress={() => console.log('Notification Pressed')}
            />
            <ImageBackground source={icons.Page} style={styles.backgroundImage}>
                {isLoading ? (
                    <View style={styles.preloaderContainer}>
                        <Image
                            source={icons.Cover}
                            style={styles.preloaderImage}
                        />
                    </View>
                ) : (
                    <ScrollView contentContainerStyle={styles.contentContainer}>
                        {sabaq.length > 0 ? (
                            sabaq.map((ayat, index) => (
                                <Text key={index} style={styles.ayatText}>
                                    {ayat.text}
                                </Text>
                            ))
                        ) : (
                            <Text style={styles.noAyatText}>Not Found</Text>
                        )}
                    </ScrollView>
                )}
            </ImageBackground>
        </View>
    );
};

export default HomeworkDetails;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    contentContainer: {
        padding: 16,
        alignItems: 'right',
        marginTop: 100,
        marginRight: 40,
        marginLeft: 20,
    },
    ayatText: {
        fontSize: 14,
        fontFamily: 'Al Majeed Quranic',
        textAlign: 'right',
        writingDirection: 'rtl',
        marginBottom: 12,
        lineHeight: 30,
        color: '#000',
    },
    noAyatText: {
        fontSize: 12,
        textAlign: 'right',
        writingDirection: 'rtl',
        color: '#666',
    },
    preloaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(245, 245, 245, 0.8)',
    },
    preloaderImage: {
        width: width * 0.6,
        height: height * 0.6,
        resizeMode: 'contain',
    },
    backgroundImage: {
        width: width,
        height: height,
        flex: 1,
    },
});