import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useContext } from 'react';
import icons from '../constant/Icons'; // Ensure icons.Teacher, icons.Student, etc., are correctly defined here.
import { colors } from '../constant/Colors';
import { LanguageContext } from '../context/LanguageContext';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

const Role = ({ navigation }) => {
  const { language } = useContext(LanguageContext);

  const setRoleInStorage = async (role) => {
    try {
      await AsyncStorage.setItem('userRole', role); // Save the role in AsyncStorage
      console.log(`${role} saved in AsyncStorage!`);
    } catch (error) {
      console.error('Error saving role to AsyncStorage:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>
        {language === 'English' ? 'Select Your Role' : 'اپنا کردار منتخب کریں'}
      </Text>

      <View style={styles.row}>
        <TouchableOpacity
          style={styles.box}
          onPress={() => {
            setRoleInStorage('Student'); // Set role to 'Student' in AsyncStorage
            navigation.navigate('StdAuth');
          }}
        >
          <Image source={icons.Man} style={styles.icon} />
          <Text style={styles.boxText}>{language === 'English' ? 'Student' : 'طالب علم'}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.box}
          onPress={() => {
            setRoleInStorage('Teacher'); // Set role to 'Teacher' in AsyncStorage
            navigation.navigate('TeacherAuth');
          }}
        >
          <Image source={icons.Teacher} style={styles.icon} />
          <Text style={styles.boxText}>{language === 'English' ? 'Teacher' : 'استاد'}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <TouchableOpacity
          style={styles.box}
          onPress={() => {
            setRoleInStorage('Parent');
            navigation.navigate('ParentAuth');
          }}
        >
          <Image source={icons.Parent} style={styles.icon} />
          <Text style={styles.boxText}>{language === 'English' ? 'Parent' : 'والدین'}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.box}
          onPress={() => {
            setRoleInStorage('Masjid');
            navigation.navigate('MasjidAuth');
          }}
        >
          <Image source={icons.Masjid} style={styles.icon} />
          <Text style={styles.boxText}>{language === 'English' ? 'Masjid' : 'مسجد'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Role;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.Background,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.Greenlight,
    textAlign: 'center',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  box: {
    backgroundColor: colors.Greenlight,
    width: 150,
    height: 150,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  icon: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  boxText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.white,
    textAlign: 'center',
  },
});
