import React from 'react'
import Button from '../../atoms/Button/Button.component';
import Heading from '../../atoms/Heading/Heading.component';
import Paragraph from '../../atoms/Paragraph/Paragraph.component';
import { StyledTextContainer, StyledView } from './LoginSuccessScreen.styled';
import { useDispatch } from 'react-redux';
import { handleLogout } from '../../../redux/authReducer';
import { Screens } from '../../../navigation/Screens';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { LoginStackParamList } from '../../../navigation/stacks/LoginStack';
import { Image } from 'react-native';
type LoginScreenProps = StackNavigationProp<LoginStackParamList, Screens.LOGIN> & RouteProp<LoginStackParamList>;

const LoginSuccessScreen = () => {
  const navigation = useNavigation<LoginScreenProps>();
  const dispatch = useDispatch();

  const handleSignOut = () => {
    dispatch(handleLogout());
  }

  return (
    <StyledView>
      <Image style={{height:'30%', width:'100%'}} source={require('../../../../assets/success.gif')} />
      <StyledTextContainer>
        <Heading>¡Bien Hecho!</Heading>
        <Heading>Iniciaste sesión correctamente</Heading>
        <Paragraph level={1}>Desafortunadamente la aplicación está en desarrollo, estate atento a las proximas actualizaciones</Paragraph>
      </StyledTextContainer>
      <Button size='md' onPress={handleSignOut}>Cerrar sesión</Button>
    </StyledView>
  )
}

export default LoginSuccessScreen