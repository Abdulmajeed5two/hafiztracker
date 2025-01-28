import { StyleSheet, Text, View } from 'react-native'
import React, { useRef } from 'react'
import Hero from '../../components/Hero'
import ContainerSection from '../../components/ContainerSection'
import icons from '../../constant/Icons'
import Drawer from '../../routes/Drawer'

const ParentScreen = () => {
    const drawerRef = useRef();


    const handleMenuPress = () => {
      if (drawerRef.current) {
        drawerRef.current.openDrawer();
      }
    };
  
  return (
    <View style={styles.container}>
      <Drawer ref={drawerRef} />
      <View style={styles.header}>
      <Hero
        menuIcon={icons.Menu}
        title="Home"
        shareIcon={icons.Share}
        userIcon={icons.Parent}
        userName="Salman"
        userLocation="Karachi, Pakistan"
        onMenuPress={() => navigation.navigate('drawer')}
      />
      </View>
      <View style={styles.containerSection}>
        <ContainerSection />
      </View>
    </View>
  )
}

export default ParentScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
      },
      header: {
        flex: 1,
        zIndex: 1, 
      },    
})