import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

import Splash from '../Splash';
import CreateAccount from '../CreateAccount';
import SignIn from '../SignIn';
import SignInOk from '../SignInOk';
import AuthRoutes from '../../AuthRoutes';

function MainRoute() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Splash" component={Splash} options={{headerShown: false}}/>      
      <Stack.Screen name="AuthUser" component={AuthRoutes} options={{headerShown: false}}/>
      <Stack.Screen name="CreateAccount" component={CreateAccount} options={{headerShown: false}}/>
      <Stack.Screen name="SignIn" component={SignIn} options={{headerShown: false}}/>
      <Stack.Screen name="SignInOk" component={SignInOk} options={{headerShown: false}}/>
    </Stack.Navigator>
  );
}

export default MainRoute;