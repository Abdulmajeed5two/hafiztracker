import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { colors } from '../constant/Colors';
import icons from '../constant/Icons';

const Hero = ({ menuIcon, title, shareIcon, userIcon, userName, userLocation, onMenuPress }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onMenuPress}>
          <Image source={menuIcon} style={styles.menuIcon} />
        </TouchableOpacity>
        <Text style={styles.title}>{title}</Text>
        <Image source={shareIcon} style={styles.searchIcon} />
      </View>

      <View style={styles.userSection}>
        <View style={styles.circularIcon}>
          <Image source={userIcon} style={styles.iconImage} />
        </View>
        <Text style={styles.txt}>{userName}</Text>
        <Text style={styles.txt}>{userLocation}</Text>
      </View>
    </View>
  );
};

export default Hero;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.PrimaryGreen,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
  },
  txt: {
    fontSize: 16,
    color: colors.white,
    alignSelf: 'center',
    padding: 12,
  },
  menuIcon: {
    width: 20,
    height: 20,
    tintColor: colors.white,
  },
  title: {
    fontSize: 20,
    color: colors.white,
  },
  searchIcon: {
    width: 20,
    height: 20,
    tintColor: colors.white,
  },
  userSection: {
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  circularIcon: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    marginBottom: 16,
  },
  iconImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    marginTop: 16,
  },
});
