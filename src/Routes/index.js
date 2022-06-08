import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View } from 'react-native';
import { LinearGradient } from 'react-native-linear-gradient';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Welcome from "../pages/Welcome";
import SignIn from "../pages/SignIn";
import Home from "../pages/Home";
import { NavigationContainer } from "@react-navigation/native";

const Tab = createBottomTabNavigator();

export default function Routes(props) {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Resumo" component={Home} options={{
          headerShown: false,
          tabBarLabel: 'Resumo',
          tabBarLabelStyle: {color: '#4A148C', marginBottom: 2,},
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialCommunityIcons name="calendar" color={focused ? '#D500F9' : '#4A148C'} size={30} />
          ),
        }} />
        <Tab.Screen name='Add' component={Welcome} options={{
          headerShown: false,
          tabBarLabel: 'Registrar',
          tabBarLabelStyle: {color: '#4A148C', marginBottom: 2,},
          tabBarIcon: ({focused }) => (
            <Ionicons name="add-outline" color={focused ? '#D500F9' : '#4A148C'} size={30} />
          ),
        }}/>
        <Tab.Screen name="SignIn" component={SignIn} options={{
          headerShown: false,
          tabBarLabel: 'Settings',
          tabBarLabelStyle: {color: '#4A148C', marginBottom: 2,},
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name="settings" color={focused ? '#D500F9' : '#4A148C'} size={30} />
          )
        }}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
