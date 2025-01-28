import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Profilecard from '../components/Profilecard';
import TopNavigation from '../routes/TopNavigation';
import UserSection from '../components/UserSection';
import Options from '../components/Options';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Profilecard />
      <Options label="Settings" />
      <View style={styles.logoutButtonContainer}>
        <Options label="Logout" onPress={() => navigation.navigate('login')} />
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'flex-start',
  },
  logoutButtonContainer: {
    position: 'absolute',
    bottom: 16,
    right: 16,
  },
});
