import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, View, Text } from 'react-native';
import icons from '../constant/Icons';
import { colors } from '../constant/Colors';
import StudentScreen from '../screens/student/StudentScreen';
import MoreOptions from '../screens/MoreOptions';
import ParentScreen from '../screens/parent/ParentScreen';

const Tab = createBottomTabNavigator();

const ParentTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#ffffff',
          height: 80,
          borderTopLeftRadius:16,
          borderTopRightRadius:16,
        },
        tabBarShowLabel: false,
      }}
    >
    <Tab.Screen
        name="Home"
        component={ParentScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <Image
                source={icons.Home}
                style={{
                  width: 30,
                  height: 30,
                  tintColor: focused ? colors.PrimaryGreen : colors.gray,
                  marginTop:26
                }}
                />
            </View>
          ),
        }}
      />
       <Tab.Screen
        name="More"
        component={MoreOptions}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <Image
                source={icons.Apps}
                style={{
                width: 30,
                height: 30,
                tintColor: focused ? colors.Greenlight : colors.gray,
                marginTop:26
                }}
              />
            </View>
          ),
        }}
      />
      
    </Tab.Navigator>
  );
};

export default ParentTabs;
