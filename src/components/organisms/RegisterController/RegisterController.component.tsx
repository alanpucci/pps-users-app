import React, { FC } from 'react'
import { StyledModal, StyledView } from './RegisterController.styled'
import Heading from '../../atoms/Heading/Heading.component';
import Button from '../../atoms/Button/Button.component';
import { Control, FieldError } from 'react-hook-form';
import { FormData } from '../../screens/LoginScreen/LoginScreen.component';
import ControlledInput from '../../molecules/ControlledInput/ControlledInput.component';
import ControlledPasswordInput from '../../molecules/ControlledPasswordInput/ControlledPasswordInput.component';
import FlashMessage from 'react-native-flash-message';

interface LoginControllerProps{
  control:Control<FormData, any>;
  handleSubmit:()=>void;
  errors?:{email?:FieldError|undefined,password?:FieldError|undefined,passwordRepeat?:FieldError|undefined};
  isVisible:boolean;
  closeModal:()=>void;
}

const RegisterController:FC<LoginControllerProps> = ({isVisible, control,handleSubmit, errors, closeModal}) => {
  return (
    <StyledModal swipeDirection="down" hasBackdrop={false} isVisible={isVisible} onSwipeComplete={closeModal} > 
      <StyledView >
          <Heading color="secondary">Crear cuenta</Heading>
          <ControlledInput autoCapitalize='none' name="email" placeholder='Correo electrónico' control={control} />
          <ControlledPasswordInput autoCapitalize='none' name="password" placeholder='Contraseña' control={control} />
          <ControlledPasswordInput autoCapitalize='none' name="passwordRepeat" placeholder='Repetir contraseña' control={control} />
          <Button size="full" onPress={handleSubmit}>Registrar</Button>
          <Button size="full" variant='secondary' onPress={closeModal}>Cancelar</Button>
      </StyledView>
    </StyledModal>
  )
}

export default RegisterController