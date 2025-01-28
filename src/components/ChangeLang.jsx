import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { colors } from '../constant/Colors';
import icons from '../constant/Icons';
import RNRestart from 'react-native-restart';
import { LanguageContext } from '../context/LanguageContext';

const ChangeLang = () => {
  const { language, setLanguage } = useContext(LanguageContext);

  const handleLanguageChange = (selectedLanguage) => {
    setLanguage(selectedLanguage);
    RNRestart.Restart();
  };

  return (
    <View style={styles.container}>
      <View style={styles.cardsContainer}>
        <TouchableOpacity
          style={[styles.card, language === 'English' && styles.selectedCard]}
          onPress={() => handleLanguageChange('English')}
        >
          <Image source={icons.US} style={styles.icon} />
          <Text style={styles.cardText}>English</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.card, language === 'Urdu' && styles.selectedCard]}
          onPress={() => handleLanguageChange('Urdu')}
        >
          <Image source={icons.PK} style={styles.icon} />
          <Text style={styles.cardText}>اردو</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChangeLang;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  cardsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  card: {
    width: 200,
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  selectedCard: {
    borderColor: colors.primary,
    borderWidth: 2,
  },
  cardText: {
    fontSize: 18,
    color: '#333',
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
});
