import { StyleSheet, Text, View, ScrollView, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { colors } from '../constant/Colors';
import axios from 'axios';
import { API_ENDPOINTS } from '../services/apiService';

const Nameof99Allah = () => {
  const [AllahNames, setAllahNames] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNames = async () => {
      try {
        const response = await axios.get(API_ENDPOINTS.Get_Allah_Names);
        
        console.log("API Response:", response.data);
        
        if (response.data && response.data.result && Array.isArray(response.data.result.data)) {
          setAllahNames(response.data.result.data); // Use the correct path to the data
        } else {
          console.error('API response does not contain valid names data:', response.data);
          setAllahNames([]); 
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching names:", error);
        setLoading(false);
      }
    };
    
    fetchNames();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Header
          title="99 Names of Allah"
          onMenuPress={() => console.log('Menu Pressed')}
          onNotifyPress={() => console.log('Notification Pressed')}
        />
        <ActivityIndicator size="large" color={colors.PrimaryGreen} style={styles.loader} />
      </View>
    );
  }

  console.log("AllahNames:", AllahNames);

  return (
    <View style={styles.container}>
      <Header
        title="99 Names of Allah"
        onMenuPress={() => console.log('Menu Pressed')}
        onNotifyPress={() => console.log('Notification Pressed')}
      />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.gridContainer}>
          {AllahNames && AllahNames.length > 0 ? (
            AllahNames.map((name, index) => (
              <View key={index} style={styles.card}>
                <Text style={styles.arabicText}>{name.arabicName}</Text>
                <Text style={styles.transliterationText}>{name.nameTransliteration}</Text>
                <Text style={styles.meaningText}>{name.meaning}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.noDataText}>No names available</Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default Nameof99Allah;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:colors.white,
  },
  scrollContainer: {
    padding: 16,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    alignItems: 'center',
  },
  arabicText: {
    fontSize: 24,
    color: colors.PrimaryGreen,
    fontFamily: 'QuranFont',
    marginBottom: 8,
  },
  transliterationText: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  meaningText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    marginTop: 20,
  },
});
