import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MenuPage from './src/MenuPage';
import LoginPage from './src/LoginPage';
import RegisterPage from './src/RegisterPage';
import UpgradePage from './src/UpgradePage';
import LicensePage from './src/LicensePage';
import ForgotPage from './src/ForgotPage';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Menu" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Menu" component={MenuPage} />
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="Register" component={RegisterPage} />
        <Stack.Screen name="Upgrade" component={UpgradePage} />
        <Stack.Screen name="License" component={LicensePage} />
        <Stack.Screen name="Forgot" component={ForgotPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
