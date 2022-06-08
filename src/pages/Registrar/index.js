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
import firestore from '@react-native-firebase/firestore';

export default function Registrar(props) {
  const isFocused = useIsFocused();
  const [isLoading, setIsLoading] = useState(false);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  
  const handleGravar = async () => {
    setIsLoading(true);
    firestore().collection('registros').add({
      nome, email
    }).then(() =>{
      Alert.alert('Registro', 'Dados Registrados com Sucesso!');
    }).catch(error => {
      Alert.alert('Regsitro', error.message);
    }).finally(() => {
      setIsLoading(false);
    })
  }

  return (
    <View style={styles.container}>
      {isFocused && (
        <>
          <Animatable.View animation="fadeInUp" style={styles.containerForm}>
            <Text style={{
              fontSize: 30,
              marginLeft: 8,
              fontWeight: 'bold'
              }}>
                Registrar Horas
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
                <Text style={styles.buttonText}>Registrar</Text>
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
