import React, {useState, useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainRoute from './src/pages/MainRoute';

const App = () => {
  return <NavigationContainer><MainRoute /></NavigationContainer>;
}
export default App;
