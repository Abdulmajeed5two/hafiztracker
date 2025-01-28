import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, View, Text } from 'react-native';
import icons from '../constant/Icons';
import { colors } from '../constant/Colors';
import SearchScreen from '../screens/SearchScreen';
import StudentList from '../screens/StudentList';
import TeacherList from '../screens/TeacherList';
import StudentScreen from '../screens/Role/StudentScreen';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
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
        component={StudentScreen}
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
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <Image
                source={icons.Search}
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
      <Tab.Screen
        name="StdList"
        component={StudentList}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <Image
                source={icons.StdList}
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
      <Tab.Screen
        name="TeacherList"
        component={TeacherList}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <Image
                source={icons.TeacherList}
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

export default TabNavigator;
