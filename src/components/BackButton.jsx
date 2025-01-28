import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import icons from '../constant/Icons';
import { colors } from '../constant/Colors';

const BackButton = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Image
        source={icons.Back}
        style={styles.icon}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 20, 
    left: 20,
    zIndex: 1, 
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: colors.white,
  },
});

export default BackButton;