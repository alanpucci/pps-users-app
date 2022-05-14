import { Screens } from '../Screens';
import React from 'react';
import { Feather } from '@expo/vector-icons'; 
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AddUserScreen from '../../components/screens/AddUserScreen/AddUserScreen.component';
import ListUsers from '../../components/screens/ListUsers/ListUsers.component';

const Tab = createBottomTabNavigator();

const AdminStack = () => {
  return (
    <Tab.Navigator initialRouteName={Screens.ADD_USER} screenOptions={({navigation}) => ({
      tabBarActiveTintColor: 'blue',
      tabBarInactiveTintColor: 'gray',
      tabBarActiveBackgroundColor:'lightgray',
    })}>
        <Tab.Screen name={Screens.ADD_USER} component={AddUserScreen} options={{ tabBarLabel:"Agregar usuario", headerTitle:"Agregar usuario", tabBarIcon:({color})=><Feather name="user-plus" size={24} color={color} />}} />
        <Tab.Screen name={Screens.LIST_USERS} component={ListUsers} options={{tabBarLabel:"Listar usuarios", headerTitle:"Listar usuarios", tabBarIcon:({color})=><Feather name="users" size={24} color={color} />}} />
    </Tab.Navigator>
  );
}

export default AdminStack