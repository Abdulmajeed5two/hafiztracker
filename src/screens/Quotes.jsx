import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React from 'react';
import Header from '../components/Header';
import { colors } from '../constant/Colors';

const quotesData = [
  {
    id: '1',
    arabic: 'إِنَّ مَعَ الْعُسْرِ يُسْرًا',
    translation: 'Verily, with hardship comes ease.',
    reference: 'Quran 94:5',
  },
  {
    id: '2',
    arabic: 'لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا',
    translation: 'Allah does not burden a soul beyond that it can bear.',
    reference: 'Quran 2:286',
  },
  {
    id: '3',
    arabic: 'خَيْرُكُمْ أَحْسَنُكُمْ أَخْلَاقًا',
    translation: 'The best among you are those who have the best manners and character.',
    reference: 'Sahih Bukhari',
  },
  {
    id: '4',
    arabic: 'مَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الْآخِرِ فَلْيَقُلْ خَيْرًا أَوْ لِيَصْمُتْ',
    translation: 'Whoever believes in Allah and the Last Day, let him speak good or remain silent.',
    reference: 'Sahih Bukhari',
  },
  {
    id: '5',
    arabic: 'إِنَّ اللَّهَ مَعَ الصَّابِرِينَ',
    translation: 'Indeed, Allah is with those who are patient.',
    reference: 'Quran 2:153',
  },
  {
    id: '6',
    arabic: 'الْمُؤْمِنُ الْقَوِيُّ خَيْرٌ وَأَحَبُّ إِلَى اللَّهِ مِنَ الْمُؤْمِنِ الضَّعِيفِ',
    translation: 'The strong believer is better and more beloved to Allah than the weak believer.',
    reference: 'Sahih Muslim',
  },
  {
    id: '7',
    arabic: 'وَمَنْ يَتَّقِ اللَّهَ يَجْعَلْ لَهُ مَخْرَجًا',
    translation: 'And whoever fears Allah, He will make a way out for him.',
    reference: 'Quran 65:2',
  },
  {
    id: '8',
    arabic: 'الدُّنْيَا سِجْنُ الْمُؤْمِنِ وَجَنَّةُ الْكَافِرِ',
    translation: 'The world is the prison of the believer and the paradise of the disbeliever.',
    reference: 'Sahih Muslim',
  },
  {
    id: '9',
    arabic: 'إِنَّ اللَّهَ يُحِبُّ التَّوَّابِينَ وَيُحِبُّ الْمُتَطَهِّرِينَ',
    translation: 'Indeed, Allah loves those who repent and purify themselves.',
    reference: 'Quran 2:222',
  },
  {
    id: '10',
    arabic: 'أَحَبُّ الْأَعْمَالِ إِلَى اللَّهِ أَدْوَمُهَا وَإِنْ قَلَّ',
    translation: 'The most beloved deeds to Allah are those done consistently, even if they are small.',
    reference: 'Sahih Bukhari',
  },
];

const Quotes = () => {
  return (
    <View style={styles.container}>
      <Header
        title="Quotes"
        onMenuPress={() => console.log('Menu Pressed')}
        onNotifyPress={() => console.log('Notification Pressed')}
      />
      <ScrollView contentContainerStyle={styles.scrollContainer} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
        {quotesData.map((quote) => (
          <View key={quote.id} style={styles.card}>
            <Text style={styles.arabicText}>{quote.arabic}</Text>
            <Text style={styles.translationText}>"{quote.translation}"</Text>
            <Text style={styles.referenceText}>- {quote.reference}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default Quotes;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scrollContainer: {
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  arabicText: {
    fontSize: 20,
    color: colors.Blue,
    textAlign: 'right',
    fontFamily: 'QuranFont',
    marginBottom: 8,
  },
  translationText: {
    fontSize: 16,
    color: '#333',
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 8,
  },
  referenceText: {
    fontSize: 14,
    color: colors.PrimaryGreen,
    fontWeight: 'bold',
    textAlign: 'right',
  },
});