import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";

import * as Animatable from "react-native-animatable";
import { useIsFocused } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SignIn() {
  const isFocused = useIsFocused();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  
  const handleGravar = () => {
    setIsLoading(true);

    auth().createUserWithEmailAndPassword(email, senha)
    .then((user) => {
      console.log('Success login', user);
    }).
    catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
        auth().signInWithEmailAndPassword(email, senha)
        .then((user) => {
          console.log(user);
        }).catch(() => {
          console.log('That email address is invalid!');
        }).finally(()=>{
          setIsLoading(false);
        });
      }else{
        setIsLoading(false);
      }
  
      if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
      }
      
    })
  }

  return (
    <View style={styles.container}>
      {isFocused && (
        <>
          <Animatable.View
            animation="fadeInLeft"
            delay={500}
            style={styles.containerHeader}
          >
            <Text style={styles.message}>Bem-vindo(a)!</Text>
          </Animatable.View>

          <Animatable.View animation="fadeInUp" style={styles.containerForm}>
            
            <Text style={styles.title}>E-mail</Text>
            <TextInput style={styles.input} defaultValue={email} onChangeText={(text) => setEmail(text)}/>

            <Text style={styles.title}>Senha</Text>
            <TextInput secureTextEntry={true} passwordRules="*" style={styles.input} defaultValue={senha} onChangeText={(text) => setSenha(text)}/>

            <TouchableOpacity
              style={styles.button}
              onPress={handleGravar}
              disabled={isLoading}
            >
              {isLoading ? (
                <Text style={styles.buttonText}>Aguarde...</Text>  
              ) : (
                <Text style={styles.buttonText}>Gravar</Text>
              )}
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
    backgroundColor: "#4A148C",
  },

  containerHeader: {
    marginTop: "14%",
    marginBottom: "8%",
    paddingStart: "5%",
    flexDirection: 'row',
    alignItems: "baseline"
  },

  message: {
    fontSize: 14,
    color: "#fff",
  },

  username: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },

  containerForm: {
    flex: 1,
    paddingStart: "5%",
    paddingEnd: "5%",
  },

  title: {
    fontSize: 20,
    color: "#fff",
    marginTop: 28,
  },

  input: {
    borderBottomWidth: 0.5,
    borderBottomColor: '#FFF',
    color: "#FFF",
    height: 40,
    marginBottom: 12,
    fontSize: 16,    
  },

  button: {
    backgroundColor: "#FFF",
    width: "100%",
    borderRadius: 4,
    paddingVertical: 8,
    marginTop: 14,
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    color: "#000",
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
