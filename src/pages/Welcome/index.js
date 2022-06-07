import React from "react";
import {
  Text,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { useIsFocused } from '@react-navigation/native';

export default function Welcome() {
  const isFocused = useIsFocused();

  return (
    <SafeAreaView style={styles.container}>
      {isFocused && (
      <Animatable.View
        animation="fadeInLeft"
        delay={500}
        style={styles.containerHeader}
      >
        <Text style={styles.message}>Welcome</Text>
      </Animatable.View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4A148C",
  },

  containerForm: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    backgroundColor: "#FFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderBottomEndRadius: 25,
  },

  containerHeader: {
    marginTop: "10%",
    marginBottom: "8%",
    paddingStart: "5%",
  },

  message: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#fff",
  },

});
