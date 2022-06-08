import React from 'react';
import { View } from 'react-native';
import LottieView from 'lottie-react-native';
import auth from '@react-native-firebase/auth';

const Splash = (props) => {

  const redirecionar = () => {
    console.log(auth().currentUser);
    if (auth().currentUser)
      props.navigation.replace('AuthUser');
    else
      props.navigation.replace('SignIn');
  }


  return (
    <View style={{flex: 1, backgroundColor: '#FFF'}}>
      <LottieView
        source={require('../../assets/splash.json')}
        autoPlay
        onAnimationFinish={redirecionar}
        loop={false}
      />
    </View>
  );
}

export default Splash;