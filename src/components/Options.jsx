import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const Options = ({ label, onPress }) => {
  return (
    <TouchableOpacity style={styles.optionCard} onPress={onPress}>
      <Text style={styles.optionText}>{label}</Text>
    </TouchableOpacity>
  );
};

export default Options;

const styles = StyleSheet.create({
  optionCard: {
    backgroundColor: '#f5f5f5', // Light gray background
    padding: 15,
    marginVertical: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // For Android shadow
  },
  optionText: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
});
