import React, { FC } from 'react'
import { StyledRoundedButtonContainer, StyledView } from './LoginController.styled'
import Heading from '../../atoms/Heading/Heading.component';
import Button from '../../atoms/Button/Button.component';
import { Control } from 'react-hook-form';
import { FormData } from '../../screens/LoginScreen/LoginScreen.component';
import ControlledInput from '../../molecules/ControlledInput/ControlledInput.component';
import ControlledPasswordInput from '../../molecules/ControlledPasswordInput/ControlledPasswordInput.component';
import AwesomeButton from '../../atoms/AwesomeButton/Button.component';
import { View } from 'react-native';

interface LoginControllerProps{
  control:Control<FormData, any>;
  handleSubmit:()=>void;
  openRegister:()=>void;
  fastSignIn:(data:FormData)=>void;
}

const LoginController:FC<LoginControllerProps> = ({control,handleSubmit, fastSignIn, openRegister}) => {
  return (
    <StyledView >
      <View>
        <ControlledInput autoCapitalize='sentences' name="email" placeholder='Email' control={control} />
        <ControlledPasswordInput autoCapitalize='none' name="password" placeholder='Password' control={control} />
        <Button size='full' onPress={handleSubmit}>Ingresar</Button>
        <Button variant='secondary' rounded size='full' onPress={openRegister}>Crear cuenta</Button>
      </View>
    </StyledView>
  )
}

export default LoginController