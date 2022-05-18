import React, { useEffect, useState } from 'react'
import { StyledView } from './AddUserScreen.styled';
import { useDispatch } from 'react-redux';
import { handleLogout } from '../../../redux/authReducer';
import { Screens } from '../../../navigation/Screens';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { LoginStackParamList } from '../../../navigation/stacks/LoginStack';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import ControlledInput from '../../molecules/ControlledInput/ControlledInput.component';
import { useForm } from 'react-hook-form';
import ControlledPasswordInput from '../../molecules/ControlledPasswordInput/ControlledPasswordInput.component';
import Logo from '../../atoms/Logo/Logo.component';
import Button from '../../atoms/Button/Button.component';
import Spinner from '../../atoms/Spinner/Spinner.component';
import { addDoc, collection } from "firebase/firestore";
import { errorHandler } from '../../../utils/ErrorsHandler';
import { auth, db, storage } from '../../../InitApp';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Camera } from 'expo-camera';
import { ref, uploadBytes } from 'firebase/storage';
import { showMessage } from 'react-native-flash-message';
import * as ImagePicker from "expo-image-picker";
import { getBlob } from '../../../utils/utils';
import { LinearGradient } from 'expo-linear-gradient';
import { BarCodeScanner } from 'expo-barcode-scanner';

type LoginScreenProps = StackNavigationProp<LoginStackParamList, Screens.LOGIN> & RouteProp<LoginStackParamList>;

type NewUser = {
  lastName:string;
  name:string;
  dni:number;
  email:string;
  password:string;
  passwordRepeat:string;
}

const AddUserScreen = () => {
  const navigation = useNavigation<LoginScreenProps>();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("");
  const {control, handleSubmit, getValues, formState:{errors}, reset, setValue} = useForm<NewUser>();
  const [scanned, setScanned] = useState(false);
  const [openQR, setOpenQR] = useState(false);

  useEffect(() => {
    (async () => {
        await Camera.requestCameraPermissionsAsync();
        await BarCodeScanner.requestPermissionsAsync();
    })();
  }, []);

  const handleBarCodeScanned = ({ data }) => {
    setScanned(true);
    setOpenQR(false);
    const dataSplit = data.split('@')
    setValue("dni",dataSplit[1].trim())
    setValue("lastName",dataSplit[4].trim())
    setValue("name",dataSplit[5].trim())
  };

  const handleOpenQR = () => {
    setScanned(false);
    setOpenQR(true);
  }

  const onSubmit = async () => {
    const values=getValues();
    let error=false;
    Object.values(values).map(value=>{
      if(!value){
        error=true;
        return;
      }
    })
    if(error || !image){
      showMessage({type:"danger", message:"Error", description:"Todos los campos son requeridos"});
      return;
    }
    if(values.password!==values.passwordRepeat){
      errorHandler('pass-diff');
      return;
    }
    setLoading(true)
    try {
      await createUserWithEmailAndPassword(auth,values.email,values.email);
      const blob:any = await getBlob(image);
      const fileName = image.substring(image.lastIndexOf("/") + 1);
      const fileRef = ref(storage, "images/" + fileName);
      await uploadBytes(fileRef, blob);
      await addDoc(collection(db, "users"), {
        lastName:values.lastName,
        name:values.name,
        dni:values.dni,
        email:values.email,
        image:fileRef.fullPath,
        creationDate:new Date()
      });
      showMessage({
        type: "success",
        message: "Exito",
        description: "Usuario creado exitosamente",
    });
    reset();
    setValue("lastName","")
    setValue("name","")
    setValue("dni",null)
    setValue("email","")
    setValue("password","")
    setValue("passwordRepeat","")
    setImage("");
    } catch (error:any) {
      errorHandler(error.code);
    }finally{
      setLoading(false);
    }
  }

  const handleSignOut = () => {
    dispatch(handleLogout());
  }

  const handleCamera = async (type) => {
    let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        aspect: [4, 3],
        quality: 1,
    });
    if (!result.cancelled) {
      setImage(result["uri"]);
    }
};

  return (
    !openQR ? 
    <StyledView>
      <LinearGradient style={{padding:'5%'}} colors={["#a8c0ff", "#3f2b96"]}>
        {loading && <Spinner />}
        {!image?
          <TouchableOpacity onPress={handleCamera}>
            <Logo />
          </TouchableOpacity>:
          <View style={{width:'100%', alignItems:'center'}}>
            <Image style={{height:200, width:200, borderRadius:20}} resizeMode="cover" source={{uri:image}}/>
          </View>
        }
        <ControlledInput control={control} name="lastName" placeholder='Apellido' />
        <ControlledInput control={control} name="name" placeholder='Nombres' />
        <ControlledInput control={control} name="dni" placeholder='Documento' keyboardType='number-pad' />
        <ControlledInput control={control} name="email" placeholder='Correo electrónico' keyboardType='email-address' />
        <ControlledPasswordInput control={control} name="password" placeholder='Contraseña' />
        <ControlledPasswordInput control={control} name="passwordRepeat" placeholder='Repetir contraseña' />
        <Button onPress={handleSubmit(onSubmit)}>Crear usuario</Button>
        <Button variant='secondary' onPress={handleOpenQR}>Escanear QR</Button>
        <View style={{marginVertical:30}}>
          <Button variant='secondary' onPress={handleSignOut}>Cerrar sesión</Button>
        </View>
      </LinearGradient>
    </StyledView> : <BarCodeScanner
    onBarCodeScanned={scanned && openQR ? undefined : handleBarCodeScanned}
    style={StyleSheet.absoluteFillObject}
  />
  )
}

export default AddUserScreen