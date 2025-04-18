import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import HomeScreen from './src/screens/HomeScreen';
import HistoryScreen from './src/screens/HistoryScreen';
import TimerContextProvider from './src/context/TimerContext';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <TimerContextProvider>
      <NavigationContainer>
        <StatusBar style="auto" />
        <Tab.Navigator>
          <Tab.Screen 
            name="Home" 
            component={HomeScreen} 
            options={{ title: 'My Timers' }}
          />
          <Tab.Screen 
            name="History" 
            component={HistoryScreen} 
            options={{ title: 'Timer History' }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </TimerContextProvider>
  );
} 