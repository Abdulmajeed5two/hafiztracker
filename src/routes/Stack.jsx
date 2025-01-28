import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Role from '../Auth/Role';
import LoginScreen from '../Auth/LoginScreen';
import RegisterScreen from '../Auth/RegisterScreen';
import SplashScreen from '../Main/SplashScreen';
import ForgetPassword from '../Auth/ForgetPassword';
import Verification from '../Auth/Verification';
import NewPassword from '../Auth/NewPassword';
import PrayerTimeScreen from '../screens/PrayerTimeScreen';
import StudentAuth from '../Auth/StudentAuth';
import TeacherAuth from '../Auth/TeacherAuth';
import ParentAuth from '../Auth/ParentAuth';
import NotificationScreen from '../screens/NotificationScreen';
import Quotes from '../screens/Quotes';
import TeacherScreen from '../screens/Role/TeacherScreen';
import ParentScreen from '../screens/Role/ParentScreen';
import Nameof99Allah from '../screens/Nameof99Allah';
import HomeWork from '../screens/HomeWork';
import CalenderScreen from '../screens/CalenderScreen';
import MasjidAuth from '../Auth/MasjidAuth';
import MasjidTabs from './MasjidTabs';
import StudentTabs from './StudentTabs';
import AuthScreen from '../screens/Auth/AuthScreen';
import AddStudentsScreen from '../screens/AddStudentsScreen';
import AddTeacherScreen from '../screens/AddTeacherScreen';
import Drawer from './Drawer';
import ChangeLang from '../components/ChangeLang';
import TeacherTabs from './TeacherTabs';

const Stack = createNativeStackNavigator();


const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='splash' component={SplashScreen} />
        <Stack.Screen name="home" component={StudentTabs}/>
        <Stack.Screen name='teacher' component={TeacherTabs}/>
        <Stack.Screen component={Role} name="role" />
        {/* <Stack.Screen name="Drawer" component={DrawerNavigator} /> */}
        <Stack.Screen name='login' component={LoginScreen}/>
        <Stack.Screen name='register' component={RegisterScreen}/>
        <Stack.Screen name='forget' component={ForgetPassword}/>
        <Stack.Screen name='verify' component={Verification}/>
        <Stack.Screen name='newpass' component={NewPassword}/>
        <Stack.Screen name='PrayTime' component={PrayerTimeScreen}/>
        <Stack.Screen name='StdAuth' component={StudentAuth}/>

        <Stack.Screen name='TeacherAuth' component={TeacherAuth}/>
        <Stack.Screen name='ParentAuth' component={ParentAuth}/>
        <Stack.Screen name='MasjidAuth' component={MasjidAuth}/>
        <Stack.Screen name='Notification' component={NotificationScreen}/>
        <Stack.Screen name='MasjidScreen' component={MasjidTabs}/>
        <Stack.Screen name='quote' component={Quotes}/>
        <Stack.Screen name='teacherscreen' component={TeacherScreen}/>
        <Stack.Screen name='parent' component={ParentScreen}/>
        <Stack.Screen name='namesofallah' component={Nameof99Allah}/>
        <Stack.Screen name='homework' component={HomeWork}/>
        <Stack.Screen name='calender' component={CalenderScreen}/>
        <Stack.Screen name='auth' component={AuthScreen} />
        <Stack.Screen name='addstd' component={AddStudentsScreen}/>
        <Stack.Screen name='addteacher' component={AddTeacherScreen}/>
        <Stack.Screen name='drawer' component={Drawer}/>
        <Stack.Screen name='lang' component={ChangeLang}/>
    </Stack.Navigator>
  )
}

export default StackNavigator

// function DrawerNavigator() {
//   return (
//     <Drawer.Navigator >
//       <Drawer.Screen name="Home" component={ProfileScreen} />
//       <Drawer.Screen name="Notifications" component={TeacherAuth} />
//     </Drawer.Navigator>
//   );
// }