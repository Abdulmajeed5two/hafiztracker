import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '../components/Header'
import Attendence from '../components/Attendence'

const CalenderScreen = () => {
  return (
    <View style={styles.container}>
      <Header
       title={'Calender'}
        onMenuPress={() => console.log('Menu Pressed')}
        onNotifyPress={() => console.log('Notification Pressed')}
      />
      <View style={styles.cal}>
        <Attendence />
      </View>
    </View>
  )
}

export default CalenderScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cal: {
    flex: 1,
    padding: 16,
  }
})