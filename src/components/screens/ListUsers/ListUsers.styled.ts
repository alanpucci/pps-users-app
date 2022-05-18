import { LinearGradient } from "expo-linear-gradient";
import { Dimensions } from "react-native";
import styled from "styled-components/native";

export const StyledLinear = styled(LinearGradient)`
    align-items:center;
    min-height:${Dimensions.get('screen').height}; 
    width:100%; 
    padding:20px;
`

export const StyledCard = styled.View`
    height:100px; 
    width:100%; 
    background-color:white; 
    border-radius:20; 
    overflow:hidden;
    flex-direction:row;
    justify-content:space-between;
    margin-vertical:10px;
    elevation:20;
`

export const StyledImage = styled.Image`
    height:100%;
    width:80;
`

export const StyledUserInfo = styled.View`
    align-items:flex-end;
    padding:10px;
`