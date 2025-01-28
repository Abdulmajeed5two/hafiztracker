import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import Inputs from '../constant/Inputs';
import { colors } from '../constant/Colors';
import Button from '../constant/Buttons';
import icons from '../constant/Icons';
import CustomDropdown from '../components/CustomDropdown';
import CustomDatePicker from '../components/CustomDatePicker';

const StudentAuth = ({ navigation }) => {
  const [isSignUp, setIsSignUp] = useState(false);

  // Dropdown data for gender
  const genderOptions = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
    { label: 'Other', value: 'other' },
  ];

  const handleDateChange = (date) => {
    console.log('Selected Date of Birth:', date);
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Image source={icons.StdList} style={styles.logo} />
        <Text style={styles.title}>Student Registration</Text>
      </View>

      {isSignUp ? (
        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Inputs placeholder="Full Name" />
            <CustomDropdown
              data={genderOptions}
              placeholder="Select Gender"
              onSelect={(item) => console.log('Selected Gender:', item)}
            />
            <CustomDatePicker
              placeholder="Date of Birth"
              onDateChange={handleDateChange}
            />
          </View>
          <Button title="Join" />
          <Text style={styles.switchText}>
            Already have an account?{' '}
            <TouchableOpacity onPress={() => setIsSignUp(false)}>
              <Text style={styles.switchLink}>Sign In</Text>
            </TouchableOpacity>
          </Text>
        </View>
      ) : (
        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Inputs placeholder="Enter Student Name" />
            <Inputs placeholder="Enter Password" />
          </View>
          <Button title="Sign in here" onPress={() => navigation.navigate('home')} />
          <Text style={styles.switchText}>
            Don't have an account?{' '}
            <TouchableOpacity onPress={() => setIsSignUp(true)}>
              <Text style={styles.switchLink}>Sign Up</Text>
            </TouchableOpacity>
          </Text>
        </View>
      )}
    </View>
  );
};

export default StudentAuth;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.PrimaryGreen,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 20,
    tintColor: colors.white,
  },
  formContainer: {
    width: '100%',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  switchText: {
    marginTop: 10,
    fontSize: 14,
    color: colors.white,
    alignSelf: 'center',
  },
  switchLink: {
    color: colors.white,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.white,
  },
});
