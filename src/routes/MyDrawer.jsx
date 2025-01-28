import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import ProfileScreen from '../screens/ProfileScreen';


const Drawer = createDrawerNavigator();

const MyDrawer = () => {
  return (
    <Drawer.Navigator>
    <Drawer.Screen name="profile" component={ProfileScreen} />
  </Drawer.Navigator>
  )
}

export default MyDrawer
