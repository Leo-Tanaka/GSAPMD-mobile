import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import DashboardScreen from './src/screens/DashboardScreen';
import TransmitScreen from './src/screens/TransmissionScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Stack.Navigator 
        initialRouteName="Dashboard"
        screenOptions={{
          headerStyle: { backgroundColor: '#151D33' },
          headerTintColor: '#FFF',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <Stack.Screen 
          name="Dashboard" 
          component={DashboardScreen} 
          options={{ title: 'Painel de Controle' }} 
        />
        <Stack.Screen 
          name="Transmitir" 
          component={TransmitScreen} 
          options={{ title: 'Painel de Transmissão' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}