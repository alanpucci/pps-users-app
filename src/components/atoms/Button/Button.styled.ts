import styled from "styled-components/native";

interface ButtonProps{
    size: 'full' | 'xl' | 'lg' | 'md' | 'sm';
    rounded:boolean;
}

const StyledButton = styled.TouchableOpacity<ButtonProps>`
    height:55px;
    margin:5px auto;
    width:${({size}) => {
    switch (size) {
        case 'full':return 100
        case 'xl': return 80
        case 'lg': return 60
        case 'md': return 50
        case 'sm': return 30
        default:return 100
    }}}%;
    border-radius:${({rounded})=> rounded ? '20px': '0'};
    align-items:center;
    justify-content:center;
`

const StyledText = styled.Text`
    font-size:20px;
`

export const StyledButtonPrimary = styled(StyledButton)`
    background-color: #1FA2FF;
    border-width:1px;
    border-color:rgb(255,255,255);
`
export const StyledTextPrimary = styled(StyledText)`
    color:white;
`

export const StyledButtonSecondary = styled(StyledButton)`
    background-color:white;
    height:35px;
    border-width:2px;
    border-color: #1FA2FF;
`

export const StyledTextSecondary = styled(StyledText)`
    color:  #1FA2FF;
`

export const StyledButtonTertiary = styled(StyledButton)`
`

export const StyledTextTertiary = styled(StyledText)`
    color: white;
    text-decoration-line:underline;
`