import React, { useRef, forwardRef, useImperativeHandle } from 'react';
import { StyleSheet, Text, View, Animated, TouchableOpacity, Dimensions, Image } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import icons from '../constant/Icons';
import { colors } from '../constant/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');
const DRAWER_WIDTH = width * 0.6;

const Drawer = forwardRef((_, ref) => {
  const translateX = useRef(new Animated.Value(-DRAWER_WIDTH)).current;
  const navigation = useNavigation();

  const onGestureEvent = Animated.event(
    [{ nativeEvent: { translationX: translateX } }],
    { useNativeDriver: true }
  );

  const onHandlerStateChange = (event) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      const { translationX } = event.nativeEvent;
      if (translationX > DRAWER_WIDTH / 2) {
        openDrawer();
      } else {
        closeDrawer();
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
    <Animated.View
      style={[
        styles.drawer,
        {
          transform: [{ translateX }],
        },
      ]}
    >
      <View style={styles.drawerContent}>
        <Text style={styles.header}>Hafiz Menu</Text>
        
        <View style={styles.btns}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutText}>Logout</Text>
            <Image source={icons.Logout} style={styles.icon} />
          </TouchableOpacity>

          <TouchableOpacity onPress={closeDrawer} style={styles.logoutButton}>
            <Text style={styles.logoutText}>Close</Text>
            <Image source={icons.Cross} style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
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
    zIndex: 10, // Ensures it's above the main screen content
    elevation: 10, // Android-specific shadow for overlay effect
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
  btns: {
    marginBottom: 20,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  logoutText: {
    fontSize: 16,
    marginRight: 10,
  },
  icon: {
    width: 20,
    height: 20,
  },
  closeButton: {
    padding: 10,
    backgroundColor: colors.PrimaryGreen,
    alignItems: 'center',
  },
  closeButtonText: {
    color: colors.white,
    fontSize: 16,
  },
});
