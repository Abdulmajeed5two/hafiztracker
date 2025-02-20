import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, View, Text } from 'react-native';
import icons from '../constant/Icons';
import { colors } from '../constant/Colors';
import SearchScreen from '../screens/SearchScreen';
import StudentList from '../screens/student/StudentList';
import TeacherScreen from '../screens/teacher/TeacherScreen';
import MasjidMoreOptions from '../screens/masjid/MasjidMoreOptions';
import TeacherMoreOptions from '../screens/teacher/TeacherMoreOptions';

const Tab = createBottomTabNavigator();

const TeacherTabs = () => {
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
        name="TeacherScreen"
        component={TeacherScreen}
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
        name="More"
        component={TeacherMoreOptions}
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
               <Tab.Screen
        name="More"
        component={MasjidMoreOptions}
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
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TeacherTabs;
