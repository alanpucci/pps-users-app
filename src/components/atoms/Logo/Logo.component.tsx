import React, { FC } from 'react'
import { View } from 'react-native';
import Image from '../Image/Image.component';
import { StyledView, StyledContainer } from './Logo.styled';

const Logo= () => {
  return (
    <StyledContainer>
      <StyledView>
        <Image source={require('../../../../assets/user.png')} />
      </StyledView>
    </StyledContainer>
  )
}

export default Logo