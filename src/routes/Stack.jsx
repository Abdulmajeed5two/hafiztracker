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
import TeacherScreen from '../screens/teacher/TeacherScreen';
import ParentScreen from '../screens/parent/ParentScreen';
import Nameof99Allah from '../screens/Nameof99Allah';
import HomeWork from '../screens/homework/HomeWork';
import CalenderScreen from '../screens/CalenderScreen';
import MasjidAuth from '../Auth/MasjidAuth';
import MasjidTabs from './MasjidTabs';
import StudentTabs from './StudentTabs';
import AddTeacherScreen from '../screens/teacher/AddTeacherScreen';
import Drawer from './Drawer';
import ChangeLang from '../components/ChangeLang';
import TeacherTabs from './TeacherTabs';
import ParentTabs from './ParentTabs';
import AddParentsScreen from '../screens/parent/AddParentsScreen';
import ParentsList from '../screens/parent/ParentsList';
import AyatScreen from '../screens/ayat/AyatScreen';
import AddHomeWorkForm from '../screens/homework/StudentSelection';
import CampusScreen from '../screens/campus/CampusScreen';
import AddCampus from '../screens/campus/AddCampus';
import StudentList from '../screens/student/StudentList';
import TeacherList from '../screens/teacher/TeacherList';
import AssignedStudents from '../screens/teacher/AssignedStudents';
import Selectteacher from '../screens/teacher/Selectteacher';
import SelectStudents from '../screens/teacher/SelectStudents';
import TeacherStudents from '../screens/teacher/TeacherStudents';
import AddStudentForm from '../screens/student/AddStudentForm';
import Surat from '../screens/surat/Surat';
import AddHomeWork from '../screens/homework/AddHomeWork';
import StudentSelection from '../screens/homework/StudentSelection';

const Stack = createNativeStackNavigator();


const StackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='splash' component={SplashScreen} />
        <Stack.Screen name="home" component={StudentTabs}/>
        <Stack.Screen name='teacher' component={TeacherTabs}/>
        <Stack.Screen name='MasjidScreen' component={MasjidTabs}/>
        <Stack.Screen name='parenthome' component={ParentTabs}/>
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
        <Stack.Screen name='quote' component={Quotes}/>
        <Stack.Screen name='teacherscreen' component={TeacherScreen}/>
        <Stack.Screen name='parent' component={ParentScreen}/>
        <Stack.Screen name='namesofallah' component={Nameof99Allah}/>
        <Stack.Screen name='homework' component={HomeWork}/>
        <Stack.Screen name='stdselection' component={StudentSelection}/>
        <Stack.Screen name='addhomework' component={AddHomeWork}/>
        <Stack.Screen name='calender' component={CalenderScreen}/>
        <Stack.Screen name='addstd' component={AddStudentForm}/>
        <Stack.Screen name='addteacher' component={AddTeacherScreen}/>
        <Stack.Screen name='addparents' component={AddParentsScreen}/>
        <Stack.Screen name='parentslist' component={ParentsList}/>
        <Stack.Screen name='drawer' component={Drawer}/>
        <Stack.Screen name='lang' component={ChangeLang}/>
        <Stack.Screen name='ayat' component={AyatScreen}/>
        <Stack.Screen name='campus' component={CampusScreen}/>
        <Stack.Screen name='addcampus' component={AddCampus}/>
        <Stack.Screen name='stdlist' component={StudentList}/>
        <Stack.Screen name='teachlist' component={TeacherList}/>
        <Stack.Screen name='assign' component={AssignedStudents}/>
        <Stack.Screen name='tselect' component={Selectteacher}/>
        <Stack.Screen name='sselect' component={SelectStudents}/>
        <Stack.Screen name='tstd' component={TeacherStudents}/>
        <Stack.Screen name='surat' component={Surat}/>
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