import React from 'react';
import {View, Text} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Registrar from "../pages/Registrar";
import Home from "../pages/Home";
import Settings from '../pages/Settings';

const Tab = createBottomTabNavigator();

export default function AuthRoutes(props) {
  return (
      <Tab.Navigator screenOptions={{
        tabBarActiveBackgroundColor: '#4A148C',
        tabBarInactiveBackgroundColor: '#4A148C',
      }}>
        <Tab.Screen name="Resumo" component={Home} options={{
          headerShown: false,
          tabBarLabel: ({ color, size, focused }) => (
            <Text style={{
              color: focused ? '#FFF' : '#DCDCDC',
              fontSize: 12,
            }}>Resumo</Text>
          ),
          tabBarLabelStyle: {color: '#FFF', marginBottom: 2,},
          tabBarIcon: ({ color, size, focused }) => (
            <MaterialCommunityIcons name="calendar" color={focused ? '#FFF' : '#DCDCDC'} size={30} />
          ),
        }} />
        <Tab.Screen name='Add' component={Registrar} options={{
          headerShown: false,
          tabBarLabel: ({ color, size, focused }) => (
            <Text style={{
              color: focused ? '#FFF' : '#DCDCDC',
              fontSize: 12,
            }}>Registrar</Text>
          ),
          tabBarLabelStyle: {color: '#4A148C', marginBottom: 2,},
          tabBarIcon: ({focused }) => (
            <MaterialCommunityIcons name="calendar-clock" color={focused ? '#FFF' : '#DCDCDC'} size={30} />
          ),
        }}/>
        <Tab.Screen name="Settings" component={Settings} options={{
          headerTitle: 'Configurações',
          headerTintColor: '#FFF',
          headerStyle: {
            backgroundColor: '#4A148C'
          },
          tabBarLabel: ({ color, size, focused }) => (
            <Text style={{
              color: focused ? '#FFF' : '#DCDCDC',
              fontSize: 12,
            }}>Configurações</Text>
          ),
          tabBarLabelStyle: {color: '#4A148C', marginBottom: 2,},
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name="settings" color={focused ? '#FFF' : '#DCDCDC'} size={30} />
          )
        }}/>
      </Tab.Navigator>
  );
}
