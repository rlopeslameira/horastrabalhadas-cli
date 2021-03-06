import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";

import * as Animatable from "react-native-animatable";
import { useIsFocused } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import AntDesign from "react-native-vector-icons/AntDesign";
import LottieView from 'lottie-react-native';

import AsyncStorage from '@react-native-async-storage/async-storage'

export default function CreateAccount(props) {
  const isFocused = useIsFocused();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  
  const handleGravar = async () => {
    setIsLoading(true);

    auth().signInWithEmailAndPassword(email, senha)
    .then((res) => {
      const { displayName, email, photoURL } = res.user;
      const user = {displayName, email, photoURL};
      console.log(user);
      AsyncStorage.setItem("user", JSON.stringify(user)).then(() => {
        Alert.alert('Login', 'Usuário autenticado com sucesso!');
        props.navigation.replace('AuthUser');
      });
      
    }).
    catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        Alert.alert('Entrar', "O e-mail informado já está em uso.")
      }else if (error.code === 'auth/invalid-email') {
        Alert.alert('Entrar', "O e-mail informado é inválido.")
      }else if (error.code === 'auth/wrong-password') {
        Alert.alert('Entrar', "Dados incorretos!\nTente novamente.")
      }else{
        Alert.alert('Entrar', error.message);
      }
    })
    .finally(() => setIsLoading(false))
  }

  const recuperarSenha = async () => {
    setIsLoading(true);
    auth().sendPasswordResetEmail(email).then(() => {
      Alert.alert('Recuperação de senha', 'Foi enviado um e-mail para ' + email);
    }).catch(error => {
      Alert.alert('Recuperação de senha', error.message);
    }).finally(() => {
    setIsLoading(false);
    })

  }

  return (
    <View style={styles.container}>
      {isFocused && (
        <>
          <Animatable.View
              animation="fadeIn"
              delay={500}
              style={styles.logo}
            >
            <LottieView
              source={require('../../assets/login.json')}
              autoPlay
            />
          </Animatable.View>
          

          <Animatable.View animation="fadeInUp" style={styles.containerForm}>
          <Text style={{
              fontSize: 30,
              marginLeft: 8,
              fontWeight: 'bold'
              }}>
                Entrar
              </Text>
            
            <TextInput 
            placeholderTextColor="#e8e8e8"
            placeholder="E-mail"
            style={styles.input} 
            defaultValue={email} 
            onChangeText={(text) => setEmail(text)}
            />

            <TextInput 
            placeholderTextColor="#e8e8e8"
            placeholder="Senha"
            secureTextEntry={true} 
            passwordRules="*" 
            style={styles.input} 
            defaultValue={senha} 
            onChangeText={(text) => setSenha(text)}/>

            <TouchableOpacity
              style={styles.button}
              onPress={handleGravar}
              disabled={isLoading}
            >
              {isLoading ? (
                <Text style={styles.buttonText}>Aguarde...</Text>  
              ) : (
                <Text style={styles.buttonText}>Entrar</Text>
              )}
            </TouchableOpacity>
        </Animatable.View>
        <Animatable.View animation="fadeInUp" style={{ 
            paddingTop: 20,
            paddingHorizontal: 12,
            flexDirection: 'row',
            justifyContent: 'space-between',
            
            }}>
            <TouchableOpacity style={{
              alignItems: "center",
              flexDirection: 'row',
              justifyContent: 'center',
              padding: 6,
            }} onPress={() => props.navigation.push('CreateAccount')}>
              <AntDesign name="adduser" size={20} color="#4A148C"/>
              <Text style={{color: '#4A148C', marginLeft: 4}}>Criar Conta</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{
              alignItems: "center",
              flexDirection: 'row',
              justifyContent: 'center',
              padding: 6,
            }} onPress={recuperarSenha}>
              <Text style={{color: '#4A148C', marginRight: 4}}>Esqueci minha Senha</Text>
              <AntDesign name="mail" size={20} color="#4A148C"/>
            </TouchableOpacity>
          </Animatable.View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e8e8e8",
    justifyContent: 'center'
  },

  logo: {
    padding: "10%",
    height: 200,
    alignItems: "center",
    justifyContent: "center"
  },

  containerHeader: {
    paddingTop: "14%",
    paddingStart: "5%",
    flexDirection: 'row',
    alignItems: "baseline"
  },

  message: {
    fontSize: 24,
    color: "#4A148C",
  },

  containerForm: {
    paddingStart: "5%",
    paddingEnd: "5%",
  },

  title: {
    fontSize: 12,
    color: "#4A148C",
    paddingTop: 4,
  },

  input: {
    borderWidth: 0.5,
    borderColor: '#CCC',
    backgroundColor: "#FFF",
    borderRadius: 12,
    color: "#4A148C",    
    height: 48,
    marginBottom: 12,
    fontSize: 16,    
    padding: 8,
  },

  button: {
    backgroundColor: "#4A148C",
    width: "100%",
    borderRadius: 4,
    paddingVertical: 8,
    marginTop: 14,
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },

  buttonRegister: {
    marginTop: 14,
    alignSelf: "center",
  },

  registerText: {
    color: "#a1a1a1",
  },
});
