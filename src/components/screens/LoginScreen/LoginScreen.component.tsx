import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { LoginStackParamList } from '../../../navigation/stacks/LoginStack';
import {fetchInitialState, handleLogin, handleRegister} from "../../../redux/authReducer";
import Logo from "../../atoms/Logo/Logo.component";
import LoginController from '../../organisms/LoginController/LoginController.component';
import { StyledView } from "./LoginScreen.styled";
import Spinner from "../../atoms/Spinner/Spinner.component";
import { FC } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { showMessage } from 'react-native-flash-message';
import { FloatingAction } from "react-native-floating-action";
import RegisterController from "../../organisms/RegisterController/RegisterController.component";

type LoginScreenProps = NativeStackScreenProps<LoginStackParamList, 'Login'>;

export type FormData={
    email:string;
    password:string;
    passwordRepeat?:string;
}

const LoginScreen:FC<LoginScreenProps> = ({navigation}) => {
    const {control, handleSubmit, getValues, setValue, reset} = useForm<FormData>();
    const dispatch = useDispatch();
    const data:any = useSelector<any>(store => store.auth);
    const [isVisible, setIsVisible] = useState(false);

    const handleSignIn = (data:FormData) => {
        const values = getValues();
        if(!values.email || !values.password){
            showMessage({type:"danger", message:"Error", description:"Todos los campos son requeridos"});
            return;
        }
        dispatch(handleLogin(data));
    }

    const handleFastSignIn = (data:FormData) => {
        setValue("email", data.email);
        setValue("password", data.password);
    }

    const handleModal = () => {
        reset();
        dispatch(fetchInitialState());
        setIsVisible(!isVisible);
    }

    const handleSignUp = (data:FormData) => {
        const values = getValues();
        if(!values.email || !values.password || !values.passwordRepeat){
            showMessage({type:"danger", message:"Error", description:"Todos los campos son requeridos"});
            return;
        }
        if(data.password!==data.passwordRepeat){
            showMessage({type:"danger", message:"Errpr", description:"Las contraseñas no coinciden"});
            return;
        }
        dispatch(handleRegister(data));
    }

    const handleFastLogin = name => {
        switch (name) {
            case 'admin':
                setValue("email", 'admin@gmail.com');
                setValue("password", 'Admin1234');
                break;
            case 'tecnico':
                setValue("email", 'tecnico@gmail.com');
                setValue("password", 'Tecnico1234');
                break;
            case 'usuario':
                setValue("email", 'cliente@gmail.com');
                setValue("password", 'Cliente1234');
                break;
            default:
                break;
        }
    }

    const actions = [
        {
          text: "Admin",
          name: "admin",
          icon: require('../../../../assets/user.png'),
          position: 1
        },
        {
          text: "Técnico",
          name: "tecnico",
          icon: require('../../../../assets/user.png'),
          position: 2
        },
        {
          text: "Usuario",
          name: "usuario",
          icon: require('../../../../assets/user.png'),
          position: 3
        }
      ];

	return (
		<StyledView colors={['#67B26F', '#4ca2cd']}>
            {data.loading && <Spinner />}
            <Logo />
            <LoginController openRegister={()=>handleModal()} fastSignIn={handleFastSignIn} handleSubmit={handleSubmit(handleSignIn)} control={control} />
            <RegisterController isVisible={isVisible} handleSubmit={handleSubmit(handleSignUp)} closeModal={()=>handleModal()} control={control} />
            <FloatingAction distanceToEdge={{horizontal:10, vertical:10 }} showBackground
                actions={actions}
                onPressItem={name => handleFastLogin(name)}
            />
        </StyledView>
	);
};

export default LoginScreen;
