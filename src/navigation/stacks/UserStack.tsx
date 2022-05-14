import { createStackNavigator } from '@react-navigation/stack';
import { Screens } from '../Screens';
import React from 'react';
import ListUsers from '../../components/screens/ListUsers/ListUsers.component';

const Stack = createStackNavigator<any>();

const UserStack = () => {
  return (
    <Stack.Navigator initialRouteName={Screens.LIST_USERS} >
        <Stack.Screen name={Screens.LIST_USERS} component={ListUsers} options={{headerTitle:"Lista de usuarios"}} />
    </Stack.Navigator>
  );
}

export default UserStack