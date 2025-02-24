import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import HijriDate from 'hijri-date';

const HijriCalender = () => {
  const hijri = new HijriDate();
  const hijriDate = hijri.toString();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hijri Calendar</Text>
      <Text style={styles.hijriDate}>{hijriDate}</Text>
    </View>
  );
};

export default HijriCalender;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 20,
    marginBottom: 10,
  },
  hijriDate: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
