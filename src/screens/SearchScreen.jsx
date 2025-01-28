import { StyleSheet, Text, TextInput, View, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { colors } from '../constant/Colors';
import icons from '../constant/Icons';

const SearchScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TextInput
          style={styles.input}
          placeholder="Search Here"
          placeholderTextColor={colors.gray}
        />
        <TouchableOpacity style={styles.iconContainer}>
          <Image source={icons.Search} style={styles.icon} />
        </TouchableOpacity>
      </View>

      <View style={styles.noResultContainer}>
        <Text style={styles.noResultText}>No results found</Text>
      </View>
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: colors.lightGray,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 10,
    color: colors.darkGray,
    backgroundColor: colors.white,
    borderRadius: 8,
    height: 40,
  },
  iconContainer: {
    padding: 5,
    marginLeft: 10,
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    tintColor: colors.darkGray,
  },
  noResultContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noResultText: {
    fontSize: 18,
    color: colors.gray,
    fontStyle: 'italic',
  },
});
