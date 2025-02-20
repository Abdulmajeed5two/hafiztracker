import { StyleSheet, View } from 'react-native';
import React from 'react';
import { SelectList } from 'react-native-dropdown-select-list';

const CustomSelectList = ({ data, selectedValue, onSelect }) => {
  return (
    <View style={styles.container}>
      <SelectList
        setSelected={onSelect}
        data={data}
        save="value"
        defaultOption={{ key: selectedValue, value: selectedValue }}
        boxStyles={styles.selectBox}
        inputStyles={styles.input}
        dropdownStyles={styles.dropdown}
        dropdownTextStyles={styles.dropdownText}
      />
    </View>
  );
};

export default CustomSelectList;

const styles = StyleSheet.create({
  container: {
    marginVertical: 8, 
  },
  selectBox: {
    borderWidth: 0, 
    borderBottomWidth: 1,   
    borderColor: '#fff',  
    borderRadius: 0, 
    paddingVertical: 10,
  },
  input: {
    fontSize: 16,
    color: '#fff',
  },
  dropdown: {
    borderRadius: 5, 
    backgroundColor: '#fff', 
  },
  dropdownText: {
    color: '#000', 
  },
});
