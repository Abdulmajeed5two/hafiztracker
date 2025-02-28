import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { colors } from '../../constant/Colors';
import Appbar from '../../components/Appbar';

const SelectType = ({ navigation }) => {
  const handleSelectType = (type) => {
    navigation.navigate('result', { selectedType: type });
  };


  return (
    <View style={styles.container}>
      <Appbar title={"Select Type"} />
      <View style={styles.typeView}>

        <TouchableOpacity 
          style={styles.btns} 
          onPress={() => handleSelectType('Sabaq')}
        >
          <Text style={styles.text}>
            Sabaq
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.btns} 
          onPress={() => handleSelectType('Manzil')}
        >
          <Text style={styles.text}>
            Manzil
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.btns} 
          onPress={() => handleSelectType('Galati')}
        >
          <Text style={styles.text}>
            Galati
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SelectType;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  typeView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btns: {
    width: 150,
    height: 50,
    backgroundColor: colors.PrimaryGreen,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  text: {
    color: '#fff',
    fontSize: 18,
  },
});
