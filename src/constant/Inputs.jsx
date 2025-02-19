import { StyleSheet, TextInput } from 'react-native';
import React, { useState } from 'react';
import { colors } from './Colors';

const Inputs = ({ value, onChangeText, placeholder, keyboardType }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <TextInput
      style={[styles.input, { borderBottomColor: isFocused ? 'black' : colors.white }]}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor={colors.white}
      keyboardType={keyboardType}
      selectionColor={colors.white}
      onFocus={() => setIsFocused(true)} 
      onBlur={() => setIsFocused(false)} 
    />
  );
};

export default Inputs;

const styles = StyleSheet.create({
  input: {
    borderBottomWidth: 1,
    paddingVertical: 10,
    fontSize: 16,
    color: colors.white,
    margin:4
  },
});