import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import Inputs from '../constant/Inputs';
import { colors } from '../constant/Colors';
import Button from '../constant/Buttons';
import icons from '../constant/Icons';

const TeacherAuth = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image source={icons.Teacher} style={styles.logo} />
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Inputs placeholder="Enter Teacher Name" />
          <Inputs placeholder="Enter Password" secureTextEntry={true} />
        </View>
        <Button title="Sign in" onPress={() => navigation.navigate('teacher')} />
      </View>
    </View>
  );
};

export default TeacherAuth;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.PrimaryGreen,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  formContainer: {
    width: '100%',
    marginTop: 20,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.white,
    textAlign: 'center',
    marginBottom: 20,
  },
});