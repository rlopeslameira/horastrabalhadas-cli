import React from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { useIsFocused } from '@react-navigation/native';
import '../../util/calendar';
import {Calendar} from 'react-native-calendars';

export default function Home() {
  const isFocused = useIsFocused();

  const loadDay = (date) =>{
    console.log(date);
  }

  return (
    <SafeAreaView style={styles.container}>
      {isFocused && (
        <>
          <Animatable.View
          animation="fadeInRight"
          delay={200}>
            <Text style={{color: '#FFF', textAlign: "center", padding: 10, fontSize: 20}}>Total de Horas Trabalhadas</Text>
            <View style={{
              marginBottom: 10, 
              flexDirection: 'row',
              justifyContent: 'space-between',
              }}>
              <View style={styles.boxHoras}>
                <Text style={{textAlign: "center"}}>Hoje</Text>
                <Text style={styles.txtHoras}>4</Text>
              </View>
              <View style={styles.boxHoras}>
                <Text style={{textAlign: "center"}}>Semana</Text>
                <Text style={styles.txtHoras}>30</Text>
              </View>
              <View style={styles.boxHoras}>
                <Text style={{textAlign: "center"}}>Mês</Text>
                <Text style={styles.txtHoras}>120</Text>
              </View>
            </View>            
          </Animatable.View>
          <Animatable.View
            animation="fadeInLeft"
            delay={200}>
          <Calendar   
            markingType={'custom'}
            current={new Date()}
            markedDates={[]}
            onDayPress={loadDay}
            hideExtraDays={true}
            enableSwipeMonths={true}
          />
        </Animatable.View>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    padding: 10,
    flex: 1,
    backgroundColor: "#4A148C",
  },
  boxHoras: {
    backgroundColor: '#FFF', 
    padding: 4,
    borderRadius: 8,
    flex: 1,
    margin: 4,
  },
  txtHoras: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: 'bold',
  },
  containerHeader: {
  },

});
