import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useContext } from 'react';
import { colors } from '../../constant/Colors';
import Appbar from '../../components/Appbar';
import { LanguageContext } from '../../context/LanguageContext';

const SelectType = ({ navigation }) => {
  const {language} = useContext(LanguageContext);
  const handleSelectType = (type) => {
    navigation.navigate('result', { selectedType: type });
  };


  return (
    <View style={styles.container}>
      <Appbar title={language === 'English' ? "Select Type":'قسم منتخب کریں'} />
      <View style={styles.typeView}>

        <TouchableOpacity 
          style={styles.btns} 
          onPress={() => handleSelectType('Sabaq')}
        >
          <Text style={styles.text}>
            {language === 'English' ? 'Sabaq':'صباق'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.btns} 
          onPress={() => handleSelectType('Manzil')}
        >
          <Text style={styles.text}>
            {language === 'English' ? 'Manzil':'منزل'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.btns} 
          onPress={() => handleSelectType('Sabqi')}
        >
          <Text style={styles.text}>
            {language === 'English' ? 'Sabqi':'سبکی'}
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
