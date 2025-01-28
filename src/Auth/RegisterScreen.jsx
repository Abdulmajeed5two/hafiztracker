import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Inputs from '../constant/Inputs'
import Button from '../constant/Buttons'
import { width } from '../constant/Size';
import { colors } from '../constant/Colors';


const RegisterScreen = ({navigation}) => {

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>HifzTracker</Text>
      </View>
      <View style={styles.inputContainer}>
        <Inputs placeholder="Masjid Name" />
        <Inputs placeholder="Your Phone" />
        <Inputs placeholder="Your CNIC"/>
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Join" />
      </View>
      <View style={styles.footer}>
        <Text style={styles.footertxt}>
          Don't have an account?
          <TouchableOpacity onPress={() => navigation.navigate('login')}>
            <Text style={styles.link}>Login</Text>
          </TouchableOpacity>
        </Text>
      </View>
    </View>
  )
}

export default RegisterScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.PrimaryGreen,
    justifyContent: 'center',
    alignItems: 'center', 
  },
  header: {
    marginBottom: width * 0.1 , 
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
  inputtxt:{
    color:colors.white
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
  footertxt:{
    color:colors.white
  },
  link: {
    color: colors.white,
    fontWeight: 'bold',
  },
});