import React, { useEffect, useState } from 'react';
import 'react-native-gesture-handler';
import { useFonts } from 'expo-font';
import InitApp from './src/InitApp';
import { Provider } from 'react-redux';
import generateStore from './src/redux/store';
import { Provider as PaperProvider } from 'react-native-paper';
import AnimatedLottieView from 'lottie-react-native';
import FlashMessage from 'react-native-flash-message';
import { Image, Text, View } from 'react-native';

export default function App() {
  const store = generateStore();
  const [lottieLoad, setLottieLoad] = useState(false);
  const [fontsLoaded] = useFonts({
    Knewave: require('./assets/fonts/Knewave-Regular.ttf'),
    IrishGrover: require('./assets/fonts/IrishGrover-Regular.ttf')
    });

    
    useEffect(()=>{
      setTimeout(() => {
        setLottieLoad(true)
      }, 6000);
    },[])
    if(!fontsLoaded) return <Image style={{height:'100%', width:'100%'}} source={require('./assets/splash.png')} />;
    
  if(!lottieLoad){
    return (
      <View style={{position: 'absolute', flex:1, paddingVertical:55,
      height: '100%', backgroundColor:"#3490dc",
      width: '100%',
      justifyContent: 'space-around', alignItems:'center'}}>
        <Text style={{fontSize:72, fontFamily:'IrishGrover', color:'white'}}>Alan Pucci</Text>
        <AnimatedLottieView  style={{width:350}}
          autoPlay 
          source={require('./assets/splash.json')}
        />
        <Text style={{fontSize:72, fontFamily:'IrishGrover',color:'white'}}>4ºB</Text>
      </View>)
  }

  return (
    <Provider store={store}>
      <PaperProvider>
        <FlashMessage position="top" />
        <InitApp />
      </PaperProvider>
    </Provider>
  );
}
