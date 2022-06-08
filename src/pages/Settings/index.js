import React, {useEffect, useState} from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity
} from "react-native";
import * as Animatable from "react-native-animatable";
import { useIsFocused } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import auth from "@react-native-firebase/auth";
import NumericInput from 'react-native-numeric-input';

export default function Settings(props) {
  const isFocused = useIsFocused();
  const [nome, setNome] = useState('');


  const sair = () => {
    auth().signOut();
    props.navigation.replace('SignIn');
  }

  return (
    <SafeAreaView style={styles.container}>
      {isFocused && (
        <>          
          <Animatable.View
          animation="fadeInUp"
          delay={200}
          style={{flex: 1, justifyContent: 'flex-start'}}>  
          <TouchableOpacity style={styles.btn} onPress={() => console.log('userData')}>
              <AntDesign name="user" size={20} color="#4A148C"/>
              <Text style={styles.listText}>Meus Dados</Text>
            </TouchableOpacity>

            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              padding: 8,
              backgroundColor: 'rgba(245,245,245, 1)',
              marginTop: 2,
            }} >
              <MaterialCommunityIcons name="timer-outline" size={20} color="#4A148C"/>
              <Text style={styles.listText}>Configuração de Horas/Aula</Text>
              <View style={{flex: 1, alignItems: 'flex-end'}}>
              <NumericInput 
              totalHeight={20}
              minValue={1}              
              rounded
              type='plus-minus' onChange={value => console.log(value)} />
              </View>
            </View>      

            <TouchableOpacity style={styles.btn} onPress={sair}>
              <MaterialCommunityIcons name="exit-run" size={20} color="#4A148C"/>
              <Text style={styles.listText}>Sair</Text>
            </TouchableOpacity>
          </Animatable.View>    
        </>      
      )}
    </SafeAreaView>
  );
}

//#4A148C

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingBottom: 10,
    flex: 1,
    backgroundColor: "#FFF",
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    backgroundColor: 'rgba(245,245,245, 1)',
    marginTop: 2,
  },
  listText: {color: '#4A148C', marginLeft: 8, fontWeight: '100', fontSize: 12}

});
