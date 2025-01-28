import { StyleSheet, TextInput } from 'react-native';
import React from 'react';
import { colors } from './Colors';

const Inputs = ({ value, onChangeText, placeholder, keyboardType }) => {
  return (
    <TextInput
      style={styles.input}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor={colors.white}
      keyboardType={keyboardType}
    />
  );
};

export default Inputs;

const styles = StyleSheet.create({
  input: {
    borderBottomWidth: 1,
    borderBottomColor: colors.white,
    paddingVertical: 10,
    fontSize: 16,
  },
});