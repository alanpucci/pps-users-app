import React, { FC } from 'react'
import { ImageProps } from 'react-native'
import { StyledImage } from './Image.styled'

const Image:FC<ImageProps> = ({source,...props}) => {
  return (
      <StyledImage resizeMode='center' source={source} {...props} />
  )
}

export default Image