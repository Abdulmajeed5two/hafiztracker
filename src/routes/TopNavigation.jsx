import React, { useContext } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image, Platform, Pressable } from 'react-native';
import icons from '../constant/Icons';
import { colors } from '../constant/Colors';
import { useNavigation } from '@react-navigation/native';


const TopNavigation = () => {
    const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Pressable 
        style={({ pressed }) => [styles.button, pressed && styles.pressed]} 
        onPress={() => navigation.navigate('home')}
      >
        <Image source={icons.Home} style={styles.icon} />
      </Pressable>
      <Pressable 
        style={({ pressed }) => [styles.button, pressed && styles.pressed]} 
        onPress={() => navigation.navigate('lang')}
      >
        <Image source={icons.World} style={styles.icon} />
      </Pressable>
      <Pressable 
  style={({ pressed }) => [styles.button, pressed && styles.pressed]} 
  onPress={() => navigation.navigate('notify')}
>
  <Image source={icons.Notify} style={styles.icon} />
  <View style={styles.dot} />
  </Pressable>
      <Pressable 
        style={({ pressed }) => [styles.button, pressed && styles.pressed]} 
        onPress={() => navigation.navigate('profile')}
      >
        <Image source={icons.Menu} style={styles.icon} />
      </Pressable>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.white,
    height: 70,
    shadowColor: colors.white,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    borderRadius: 0,
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    elevation: 8,
  },
  dot: {
    position: 'absolute',
    top: 10,
    right: 20,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.red,
  },  
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
  },
  pressed: {
    transform: [{ scale: 0.95 }],
  },
  text: {
    textAlign: 'center',
    color: colors.white,
    fontSize: 14,
    fontWeight: '600',
    marginTop: 4,
  },
  icon: {
    width: 28,
    height: 28,
    tintColor: colors.Greenlight, 
  },
});

export default TopNavigation;
