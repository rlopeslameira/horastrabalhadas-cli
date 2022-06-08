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

export default function CreateAccount(props) {
  const isFocused = useIsFocused();
  const [isLoading, setIsLoading] = useState(false);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  
  const handleGravar = async () => {
    setIsLoading(true);

    auth().createUserWithEmailAndPassword(email, senha)
    .then((user) => {
      auth().currentUser.updateProfile({displayName: nome});
      Alert.alert('Cadastro', "Usuário cadastrado com sucesso!");
      props.navigation.push('SignIn');
      setIsLoading(false); 
    }).
    catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        Alert.alert('Mensagem', "O e-mail informado já está em uso.")
      }else if (error.code === 'auth/invalid-email') {
        Alert.alert('Mensagem', "O e-mail informado é inválido.")
      }else{
        Alert.alert('Mensagem', error.message);
      }
      setIsLoading(false);
    })
    .finally(() => setIsLoading(false))
  }

  return (
    <View style={styles.container}>
      {isFocused && (
        <>
          <Animatable.View
              animation="fadeInDown"
              delay={500}
              style={styles.logo}
            >
            <LottieView
              source={require('../../assets/create.json')}
              autoPlay
              loop={false}
            />
          </Animatable.View>

          <Animatable.View animation="fadeInUp" style={styles.containerForm}>
            <Text style={{
              fontSize: 30,
              marginLeft: 8,
              fontWeight: 'bold'
              }}>
                Criar Conta
              </Text>
            
              <TextInput 
            placeholderTextColor="#C0C0C0"
            placeholder="Nome"
            style={styles.input} 
            defaultValue={nome} 
            onChangeText={(text) => setNome(text)}
            />

            <TextInput 
            placeholderTextColor="#C0C0C0"
            placeholder="E-mail"
            style={styles.input} 
            keyboardType="email-address"
            defaultValue={email} 
            onChangeText={(text) => setEmail(text)}
            />

            <TextInput 
            placeholderTextColor="#C0C0C0"
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
                <Text style={styles.buttonText}>Criar conta</Text>
              )}
            </TouchableOpacity>
        </Animatable.View>
          <Animatable.View animation="fadeInUp" style={{ 
            marginTop: 20,
            }}>
            <TouchableOpacity style={{
              alignItems: "center",
              flexDirection: 'row',
              justifyContent: 'center',
              padding: 6,
            }} onPress={() => props.navigation.push('SignIn')}>
              <AntDesign name="arrowleft" size={20} color="#4A148C"/>
              <Text style={{color: '#4A148C', marginLeft: 4}}>Já tenho uma conta</Text>
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
    backgroundColor: "#f6f6f6",
    justifyContent: "center",
  },

  logo: {
    padding: "10%",
    height: 200,
    alignItems: "center",
    justifyContent: "center",
  },

  containerForm: {
    paddingTop: 20,
    paddingStart: "5%",
    paddingEnd: "5%",
  },

  title: {
    fontSize: 12,
    color: "#4A148C",
    paddingTop: 4,
  },

  input: {
    borderWidth: 1,
    borderColor: '#C0C0C0',
    backgroundColor: "#FFF",
    borderRadius: 12,
    color: "#4A148C",    
    height: 48,
    marginBottom: 12,
    fontSize: 14,    
    padding: 8,
  },

  button: {
    backgroundColor: "#4A148C",
    width: "100%",
    borderRadius: 12,
    paddingVertical: 8,
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
