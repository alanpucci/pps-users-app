import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../../components/screens/LoginScreen/LoginScreen.component';
import { Screens } from '../Screens';
import LoginSuccessScreen from '../../components/screens/LoginSuccessScreen/LoginSuccessScreen.component';
import React from 'react';

export type LoginStackParamList = {
    Login: undefined;
    LoginSuccess:undefined;
};
const Stack = createStackNavigator<LoginStackParamList>();

const SuccessStack = () => {
  return (
    <Stack.Navigator initialRouteName={Screens.LOGIN_SUCCESS} screenOptions={{headerShown:false}}>
        <Stack.Screen name={Screens.LOGIN_SUCCESS} component={LoginSuccessScreen} />
    </Stack.Navigator>
  );
}

export default SuccessStack