import { Image, StyleSheet, Text, View, ScrollView, Alert, KeyboardAvoidingView, ActivityIndicator } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import Inputs from '../../constant/Inputs';
import { colors } from '../../constant/Colors';
import Button from '../../constant/Buttons';
import icons from '../../constant/Icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosInstance from '../../services/axiosInterceptor';
import Toast from 'react-native-toast-message';
import { ParentsContext } from '../../context/ParentsContext';
import CustomSelectList from '../../components/SelectList';

const AddStudentForm = ({ navigation }) => {
    const { parentsData } = useContext(ParentsContext);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        studentName: '',
        userName: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        whatsapp: '',
        parentId: '',
        emergencyContact: '',
        area: '',
        address: '',
        masjidId: '',
    });

    useEffect(() => {
        const fetchMasjidId = async () => {
            const masjidId = await AsyncStorage.getItem('id');
            if (masjidId) {
                setFormData((prev) => ({ ...prev, masjidId }));
            }
        };
        fetchMasjidId();
    }, []);

    const RegisterStudents = async () => {
        if (!formData.studentName || !formData.userName || !formData.email || !formData.password || !formData.parentId) {
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2: 'Please fill all required fields.',
          })  
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            Toast.show({ type: 'error', text1: 'Error', text2: 'Password and Confirm Password do not match.' });
            return;
        }

        setLoading(true);
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await axiosInstance.post('/Student/RegisterStudent', formData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            
            Toast.show({ type: 'success', text1: 'Registration Successful', text2: 'Student registered successfully!' });
            navigation.goBack();
        } catch (error) {
            Toast.show({ type: 'error', text1: 'Error', text2: 'Failed to register student. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.iconContainer}>
                    <Image source={icons.Std} style={styles.logo} />
                </View>
                <Text style={styles.title}>Student Registration</Text>
            </View>

            <KeyboardAvoidingView style={{ flex: 1, width: '100%' }} behavior='padding'>
                <ScrollView style={styles.formContainer} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
                    <View style={styles.inputContainer}>
                        <CustomSelectList
                            data={parentsData.map(parent => ({ key: parent.id, value: parent.fatherName }))}
                            selectedValue={formData.parentId || 'Select Parent'}
                            onSelect={(val) => handleInputChange('parentId', val)}
                        />
                        <Inputs placeholder='Student Name' value={formData.studentName} onChangeText={(text) => handleInputChange('studentName', text)} />
                        <Inputs placeholder='Username' value={formData.userName} onChangeText={(text) => handleInputChange('userName', text)} />
                        <Inputs placeholder='Email' value={formData.email} onChangeText={(text) => handleInputChange('email', text)} />
                        <Inputs placeholder='Password' value={formData.password} onChangeText={(text) => handleInputChange('password', text)} secureTextEntry />
                        <Inputs placeholder='Confirm Password' value={formData.confirmPassword} onChangeText={(text) => handleInputChange('confirmPassword', text)} secureTextEntry />
                        <Inputs placeholder='Phone' value={formData.phone} onChangeText={(text) => handleInputChange('phone', text)} />
                        <Inputs placeholder='Whatsapp' value={formData.whatsapp} onChangeText={(text) => handleInputChange('whatsapp', text)} />
                        <Inputs placeholder='Emergency Contact' value={formData.emergencyContact} onChangeText={(text) => handleInputChange('emergencyContact', text)} />
                        <Inputs placeholder='Area' value={formData.area} onChangeText={(text) => handleInputChange('area', text)} />
                        <Inputs placeholder='Address' value={formData.address} onChangeText={(text) => handleInputChange('address', text)} />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>

            <View style={styles.buttonContainer}>
                {loading ? <ActivityIndicator size='large' color={colors.white} /> : <Button title='Register Now' onPress={RegisterStudents} />}
            </View>
            <Toast />
        </View>
    );
};

export default AddStudentForm;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.PrimaryGreen,
        alignItems: 'center',
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
