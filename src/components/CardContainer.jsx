import { Image, StyleSheet, Text, View,ScrollView } from 'react-native'
import React, { useContext } from 'react'
import { colors } from '../constant/Colors'
import { height, width } from '../constant/Size'
import icons from '../constant/Icons'
import { LanguageContext } from '../context/LanguageContext'
import Attendence from './Attendence'

const CardContainer = () => {
  const {language} = useContext(LanguageContext);
  return (
    <View style={styles.container}>
        <View style={styles.row}>
      <View style={styles.card}>
        <Image style={styles.img} source={icons.Assignment}/>
        <Text style={styles.txt}>{language === 'English' ? 'Assignment' : 'اسائنمنٹ'}</Text>
        <Text >{language === 'English' ? 'Online':'آن لائن'}</Text>
      </View>
      <View style={styles.card}>
      <Image style={styles.img} source={icons.Lecture}/>
        <Text style={styles.txt}>{language === 'English' ? 'Lecture' : 'لیکچر'}</Text>
        <Text >{language === 'English' ? 'Academic':'تعلیمی'}</Text>
      </View>
        </View>
<ScrollView>
    <View style={styles.Activity}>
       <Attendence />
        </View>
</ScrollView>
    </View>
  )
}

export default CardContainer

const styles = StyleSheet.create({
    container: {
        flex:1
    },
    img:{
        width:width*0.1,
        height:width*0.1,
    },
    row:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: width * 0.016,
    marginTop:height *0.02,
    },
    card:{
    backgroundColor: colors.white,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: width * 0.020,
    borderRadius: 8,
    marginHorizontal:12,
    elevation: 3,
    },
    Activity:{
        marginVertical: width * 0.016,
    },
    ActivityCard:{
        backgroundColor: colors.white,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 26,
        borderRadius: 8,
        marginHorizontal:16,
        margin:6,
        elevation: 3,
    },
})