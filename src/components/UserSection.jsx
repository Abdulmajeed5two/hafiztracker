import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../constant/Colors'
import { width } from '../constant/Size'
import icons from '../constant/Icons'

const UserSection = () => {
    return (
        <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
        <Text style={styles.txt}>Feroz</Text>
        <View style={styles.icon}>
            <Image source={icons.Search} style={styles.img} />
            <Image source={icons.Info} style={styles.img} />
        </View>
        </View>
      </View>
    </View>
  )
}

export default UserSection

const styles = StyleSheet.create({
    header:{
        backgroundColor:colors.white,
        padding: width * 0.02,
    },
    headerLeft:{
        flexDirection:'row',
        justifyContent:'space-between'
    },
    txt:{
        fontSize: width * 0.05,
        color: colors.Greenlight,
        left:16,
    },
    img:{
        width: width * 0.08,
        height: width * 0.08,
        tintColor:colors.Greenlight
    },
    icon:{
        flexDirection:'row',
        justifyContent:'flex-end',
        gap:12,
        right:16
    }
    
})