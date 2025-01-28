import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { colors } from '../constant/Colors';
import Inputs from '../constant/Inputs';
import Button from '../constant/Buttons';
import { width } from '../constant/Size';

const LoginScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>HifzTracker</Text>
      </View>
      <View style={styles.inputContainer}>
        <Inputs 
          placeholder="Enter Your Email"
          placeholderTextColor={colors.white}
          selectionColor={colors.white}
        />
        <Inputs 
          placeholder="Enter Your Password"
        />
        <TouchableOpacity style={styles.forgotPassword} onPress={() => navigation.navigate('forget')}>
          <Text style={styles.link}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Sign in Now" onPress={() => navigation.navigate('home')} />
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Don't have an account?{' '}
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('register')}>
          <Text style={styles.link}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.PrimaryGreen,
    justifyContent: 'center',
    alignItems: 'center', 
  },
  header: {
    marginBottom: width * 0.1, 
    alignItems: 'center',
  },
  logo: {
    fontSize: 30, 
    fontWeight: 'bold', 
    color: colors.white, 
  },
  inputContainer: {
    marginTop: 20,
    width: width * 0.9,
  },
  forgotPassword: {
    marginTop: 10,
    alignItems: 'flex-end',
  },
  buttonContainer: {
    marginTop: 20,
    width: width * 0.9,
  },
  footer: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerText: {
    color: colors.white,
  },
  link: {
    color: colors.white,
    fontWeight: 'bold',
  },
});
