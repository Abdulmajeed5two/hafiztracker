import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useContext } from 'react'
import { LanguageContext } from '../context/LanguageContext'

const ProfileCard = () => {
  const {language} = useContext(LanguageContext);

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://picsum.photos/200/300' }}
        style={styles.image}
      />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{language === 'English' ? 'Feroz':'فیروز'}</Text>
        <Text style={styles.description}>{language === 'English' ? 'Software Engineer' : 'مهندس نرم افزار'}</Text>
      </View>
    </View>
  )
}

export default ProfileCard

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 18,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  infoContainer: {
    justifyContent: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  description: {
    fontSize: 16,
    color: '#666',
  },
})