import { NavigationContainer } from '@react-navigation/native';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import React from 'react';
import { useSelector } from 'react-redux';
import { firebaseConfig } from '../firebase';
import LoginStack from './navigation/stacks/LoginStack';
import AdminStack from './navigation/stacks/AdminStack';
import AddUserScreen from './components/screens/AddUserScreen/AddUserScreen.component';
import ListUsers from './components/screens/ListUsers/ListUsers.component';
import UserStack from './navigation/stacks/UserStack';

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);

const InitApp = ()=> {
  const data:any = useSelector<any>(store=>store.auth);
  return (
      <NavigationContainer>
          {data.success ? 
            data.user.email==='admin@gmail.com'?<AdminStack /> : <UserStack/> :  
            <LoginStack />
          }
      </NavigationContainer>
  );
}

export default InitApp
