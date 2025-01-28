import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Inputs from '../constant/Inputs';
import { colors } from '../constant/Colors';
import Button from '../constant/Buttons';
import icons from '../constant/Icons';

const ParentAuth = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.Row}>
        <Image source={icons.Parent} style={styles.logo} />
      </View>

      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Inputs placeholder="Enter Parent Name" />
          <Inputs placeholder="Enter Password" secureTextEntry={true} />
        </View>
        <Button title="Sign in" onPress={() => navigation.navigate('home')} />
      </View>
    </View>
  );
};

export default ParentAuth;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.PrimaryGreen,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  Row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 20,
  },
  rowTxt: {
    fontWeight: '600',
    fontSize: 16,
    color: colors.white,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  formContainer: {
    width: '100%',
    marginTop: 20,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
});