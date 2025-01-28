import { Image, StyleSheet, Text, TouchableOpacity, View, TextInput, ScrollView } from 'react-native';
import React, { useState } from 'react';
import Inputs from '../constant/Inputs';
import { colors } from '../constant/Colors';
import Button from '../constant/Buttons';
import icons from '../constant/Icons';
import CustomDropdown from '../components/CustomDropdown';

const AddStudentsScreen = ({ navigation }) => {
  const [students, setStudents] = useState([{ name: '', dob: '', gender: '' }]);
  const genderOptions = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
    { label: 'Other', value: 'other' },
  ];

  const addStudent = () => {
    setStudents([...students, { name: '', dob: '', gender: '' }]);
  };

  const handleInputChange = (index, field, value) => {
    const newStudents = [...students];
    newStudents[index][field] = value;
    setStudents(newStudents);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <Image source={icons.Man} style={styles.logo} />
        </View>
        <Text style={styles.title}>
          Student Registration
        </Text>
      </View>
      <ScrollView style={styles.formContainer}>
        {students.map((student, index) => (
          <View key={index} style={styles.inputContainer}>
            <Inputs 
              placeholder="Full Name" 
              value={student.name}
              onChangeText={(text) => handleInputChange(index, 'name', text)}
            />
            <CustomDropdown
              data={genderOptions}
              placeholder="Select Gender"
              onSelect={(item) => handleInputChange(index, 'gender', item.value)}
            />
            <Text style={styles.label}>Date of Birth</Text>
            <TextInput
              style={styles.input}
              placeholder="Select Date of Birth"
              value={student.dob}
              onChangeText={(text) => handleInputChange(index, 'dob', text)}
            />
          </View>
        ))}
        <TouchableOpacity onPress={addStudent}>
          <Text style={styles.addMoreText}>
            Add More Student
          </Text>
        </TouchableOpacity>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Button title="Register Now" />
      </View>
    </View>
  );
};

export default AddStudentsScreen;

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
    overflow: 'hidden', // Ensure the logo fits within the circle
  },
  logo: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain', // Adjust to contain
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
  },
});