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
          tabBarIcon: ({color, size, focused }) => (
            <View>
              <LinearGradient style={{
                width: 60,
                height: 60,
                borderRadius: 30,
                marginBottom: 26,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                elevation: 6,
                shadowColor: '#9C27B0',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 5,
              }} start={{ x: 0, y: 1 }} end={{ x: 0, y: 0 }} colors={focused ? ['#D500F9', '#D580F0'] : ['#4A148C', '#D500F9']}>
                <Ionicons name="add" size={26} color='#FFF'/>
              </LinearGradient>
            </View>
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
