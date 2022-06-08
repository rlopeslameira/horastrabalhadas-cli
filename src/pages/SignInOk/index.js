import React from 'react';
import { View } from 'react-native';
import LottieView from 'lottie-react-native';

export default SignInOk = (props) => {

  const redirecionar = () => {
    props.navigation.replace('Home');
  }

  return (
    <View style={{flex: 1, backgroundColor: '#FFF'}}>
      <LottieView
        source={require('../../assets/login_ok.json')}
        autoPlay
        onAnimationFinish={redirecionar}
        loop={false}
      />
    </View>
  );
}