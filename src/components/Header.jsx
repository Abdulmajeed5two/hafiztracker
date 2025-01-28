import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import icons from '../constant/Icons';
import { colors } from '../constant/Colors';

const Header = ({ title, onMenuPress, onNotifyPress }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onMenuPress}>
        <Image source={icons.Menu} style={styles.Icon} />
      </TouchableOpacity>

      <Text style={styles.title}>{title}</Text>

      <TouchableOpacity onPress={onNotifyPress}>
        <Image source={icons.Notify} style={styles.Icon} />
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 60,
    paddingHorizontal: 15,
    backgroundColor: colors.PrimaryGreen,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.white,
  },
  Icon:{
    width: 20,
    height: 20,
    tintColor:colors.white
  }
});
