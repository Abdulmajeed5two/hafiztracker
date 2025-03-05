import { StatusBar, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import ContextProvider from './src/context/ContextProvider';
import StackNavigator from './src/routes/Stack';
import { colors } from './src/constant/Colors';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { initializeNotifications } from './src/services/Firebase';

const App = () => {

  useEffect(() => {
    let unsubscribe;
    const setupNotifications = async () => {
      unsubscribe = await initializeNotifications();
    };
    setupNotifications();
    return () => unsubscribe && unsubscribe();
  }, []);


  return (
    <View style={styles.container}>
      <GestureHandlerRootView>
      <NavigationContainer>
        <ContextProvider>
          <StatusBar
           animated={true}
           backgroundColor={colors.PrimaryGreen}
           barStyle="dark-content"
           showHideTransition="fade"
           hidden={false}
           />
          <StackNavigator />
        </ContextProvider>
      </NavigationContainer>
      </GestureHandlerRootView>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});