import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Session from '~/pages/Session';
import Confirm from '~/pages/Confirm';
import Create from '~/pages/Create';
import ForgetPassword from '~/pages/ForgetPassword';
import Home from '~/pages/Home';
import PasswordReset from '~/pages/PasswordReset';
import Perfil from '~/pages/Perfil';
import Schedule from '~/pages/Schedule';

const Stack = createNativeStackNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        options={{headerShown: false}}
        name="Home"
        component={Home}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="Schedule"
        component={Schedule}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="Confirm"
        component={Confirm}
      />
      <Stack.Screen
        options={{headerShown: false}}
        name="Perfil"
        component={Perfil}
      />
    </Stack.Navigator>
  );
};

export default function MainNavigator(isLogin = false) {
  if (!isLogin) {
    return (
      <Stack.Navigator initialRouteName="Session">
        <Stack.Screen
          options={{headerShown: false}}
          name="Session"
          component={Session}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="Create"
          component={Create}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="Forget"
          component={ForgetPassword}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="Password"
          component={PasswordReset}
        />
      </Stack.Navigator>
    );
  }

  return <MainStackNavigator />;
}
