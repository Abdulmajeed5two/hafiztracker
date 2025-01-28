import { Image, StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native';
import React, { useState } from 'react';
import Inputs from '../constant/Inputs';
import { colors } from '../constant/Colors';
import Button from '../constant/Buttons';
import icons from '../constant/Icons';
import CustomDropdown from '../components/CustomDropdown';

const AddTeacherScreen = ({ navigation }) => {

  const [dob, setDob] = useState('');

  const genderOptions = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
    { label: 'Other', value: 'other' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <Image source={icons.Teacher} style={styles.logo} />
        </View>
        <Text style={styles.title}>
          Teacher Registration
        </Text>
      </View>

      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Inputs placeholder="Full Name" />
          <Inputs placeholder="Mobile No" />
          <Inputs placeholder="Password" />
          <Inputs placeholder="confirm Password" />
          <CustomDropdown
            data={genderOptions}
            placeholder="Select Gender"
            onSelect={(item) => console.log('Selected Gender:', item)}
          />
          <Inputs placeholder="CNIC NO" />
          <Inputs placeholder="Current Address" />
          <Inputs placeholder="Refrence Name" />
          <Inputs placeholder="Refrence Phone no" />
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Register Now" />
      </View>
    </View>
  );
};

export default AddTeacherScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.PrimaryGreen,
    justifyContent: 'flex-start', 
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    flexWrap: 'wrap',  
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
    width: 60,
    height: 60,
    resizeMode: 'contain',
    tintColor: colors.PrimaryGreen,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.white,
    textAlign: 'center',
    flexShrink: 1, 
    marginTop: 10,
  },
  formContainer: {
    width: '100%',
    flex: 1, 
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: colors.white,
    marginBottom: 10,
  },
  input: {
    width: '100%',
    padding: 10,
    backgroundColor: colors.white,
    borderRadius: 5,
    marginBottom: 20,
  },
  addMoreText: {
    fontSize: 16,
    color: colors.white,
    textAlign: 'center',
    marginVertical: 10,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    paddingHorizontal: 20,
  }
});
