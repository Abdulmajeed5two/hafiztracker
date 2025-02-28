import { StyleSheet, Text, View, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors } from '../constant/Colors';
import { height, width } from '../constant/Size';
import icons from '../constant/Icons';

const SplashScreen = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  

  useEffect(() => {
    const checkTokenAndRedirect = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const role = await AsyncStorage.getItem('userRole');
        console.log("data..........", token, role);
        setTimeout(() => {
          if (token && role) {
            switch(role) {
              case 'Student':
                navigation.navigate('home');
                break;
              case 'Teacher':
                navigation.navigate('teacher'); 
                break;
              case 'Parent':
                navigation.navigate('parenthome');
                break;
              case 'Masjid':
                navigation.navigate('MasjidScreen');
                break;
              default:
                navigation.navigate('role'); 
                break;
            }
          } else {
            navigation.navigate('role');
          }
          setIsLoading(false);
        }, 4000);
      } catch (error) {
        console.error('Error checking token or role:', error);
        navigation.navigate('role'); // If error occurs, navigate to role selection
      }
    };

    checkTokenAndRedirect();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <LottieView 
        source={require('../assets/lottie/white.json')}
        autoPlay
        loop
        style={styles.bg}
      />
      
      <View style={styles.centeredContent}>
        <Image 
          source={icons.Logo} 
          style={styles.logo}
        />
        {/* <Text style={styles.logoText}>HifzTracker</Text> */}
      </View>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.PrimaryGreen,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative', 
  },
  bg: {
    width: width * 1.2,
    height: height * 1.2,
  },
  centeredContent: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1, 
  },
  logo: {
    width: 250, 
    height: 250,
    alignSelf: 'center',
  },
  logoText: {
    fontSize: 24, 
    fontWeight: 'bold',
    color: 'white',
  },
});
