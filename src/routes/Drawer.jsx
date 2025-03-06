import React, { useRef, forwardRef, useImperativeHandle, useContext } from 'react';
import { StyleSheet, Text, View, Animated, TouchableOpacity, Dimensions } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../constant/Colors';
import { LanguageContext } from '../context/LanguageContext';

const { width } = Dimensions.get('window');
const DRAWER_WIDTH = width * 0.6;

const Drawer = forwardRef((_, ref) => {
  const {language} = useContext(LanguageContext);
  const translateX = useRef(new Animated.Value(-DRAWER_WIDTH)).current;
  const navigation = useNavigation();

  const onGestureEvent = Animated.event(
    [{ nativeEvent: { translationX: translateX } }],
    { useNativeDriver: true }
  );

  const onHandlerStateChange = (event) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      const { translationX, velocityX } = event.nativeEvent;
      if (translationX > DRAWER_WIDTH / 4 || velocityX > 500) {
        openDrawer();
      } else if (translationX < -DRAWER_WIDTH / 4 || velocityX < -500) {
        closeDrawer();
      } else {
        Animated.spring(translateX, {
          toValue: translateX > -DRAWER_WIDTH / 2 ? 0 : -DRAWER_WIDTH,
          useNativeDriver: true,
        }).start();
      }
    }
  };

  const openDrawer = () => {
    Animated.spring(translateX, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
  };

  const closeDrawer = () => {
    Animated.spring(translateX, {
      toValue: -DRAWER_WIDTH,
      useNativeDriver: true,
    }).start();
  };

  useImperativeHandle(ref, () => ({
    openDrawer,
    closeDrawer,
  }));

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      console.log('User logged out successfully.');
      navigation.navigate('role');
    } catch (error) {
      console.error('Logout Error:', error);
    }
  };

  return (
    <PanGestureHandler
      onGestureEvent={onGestureEvent}
      onHandlerStateChange={onHandlerStateChange}
    >
      <Animated.View
        style={[styles.drawer, { transform: [{ translateX }] }]}
      >
        <View style={styles.drawerContent}>
          <Text style={styles.header}>{language === 'English' ? 'Hafiz Menu':'حافظ مینو'}</Text>
          <View style={styles.btns}>
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
              <Text style={styles.logoutText}>{language === 'English' ? 'Logout':'لاگ آؤٹ'}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={closeDrawer} style={styles.logoutButton}>
              <Text style={styles.logoutText}>{language === 'English' ? 'Close':'بند کرو'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    </PanGestureHandler>
  );
});

export default Drawer;

const styles = StyleSheet.create({
  drawer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: DRAWER_WIDTH,
    height: '100%',
    backgroundColor: colors.white,
    zIndex: 10,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
  drawerContent: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: colors.PrimaryGreen,
    padding: 10,
    borderRadius: 5,
  },
  logoutText: {
    fontSize: 16,
    color: colors.white,
    textAlign: 'center',
  },
});
