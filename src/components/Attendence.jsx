import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Calendar } from 'react-native-calendars';

const Attendence = () => {
  const attendance = {
    '2025-01-02': 'Present',
    '2025-01-04': 'Absent',
    '2025-01-01': 'Absent',
    '2025-01-07': 'Present',
    '2025-01-08': 'Present',
  };

  const markedDates = Object.keys(attendance).reduce((acc, date) => {
    acc[date] = {
      selected: true,
      selectedColor: attendance[date] === 'Present' ? 'green' : 'red',
    };
    return acc;
  }, {});

  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Attendance Calendar</Text>
      <Calendar
        onDayPress={(day) => setSelectedDate(day.dateString)}
        markedDates={{
          ...markedDates,
          ...(selectedDate && {
            [selectedDate]: {
              selected: true,
              selectedColor: 'blue',
            },
          }),
        }}
        theme={{
          todayTextColor: 'blue',
        }}
      />
      <View style={styles.infoContainer}>
        {selectedDate ? (
          <Text style={styles.infoText}>
            {selectedDate} - {attendance[selectedDate] || 'No record'}
          </Text>
        ) : (
          <Text style={styles.infoText}>Select a date to view status</Text>
        )}
      </View>
    </View>
  );
};

export default Attendence;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  infoContainer: {
    marginTop: 16,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
  },
  infoText: {
    fontSize: 16,
    textAlign: 'center',
  },
});
