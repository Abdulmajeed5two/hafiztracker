import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Inputs from '../constant/Inputs';
import { colors } from '../constant/Colors';
import icons from '../constant/Icons';
import Button from '../constant/Buttons';

const NewPassword = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.logo} source={icons.Lock} />
        <Text style={styles.forgetText}>New Password</Text>
      </View>
      <View style={styles.inputContainer}>
        <Inputs
          placeholder="Enter Your New Password"
          placeholderTextColor={colors.white}
          selectionColor={colors.white}
        />
      </View>
      <View style={styles.inputContainer}>
        <Inputs
          placeholder="Enter Your Confirm Password"
          placeholderTextColor={colors.white}
          selectionColor={colors.white}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Confirm password"   onPress={()=> navigation.navigate('home')}/>
      </View>
    </View>
  );
};

export default NewPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.PrimaryGreen,
    paddingHorizontal: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 70,
    height: 70,
    tintColor: colors.white,
    marginBottom: 10,
  },
  forgetText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.white,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  buttonContainer: {
    width: '100%',
  },
});
