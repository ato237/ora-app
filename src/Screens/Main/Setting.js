import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Settingss = () => {
  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={{ color: "white", marginHorizontal: 20 }}>
          Settings
        </Text>
      </View>
      <View style={styles.options}>
        <Text style={{fontSize:20}}>Select Language </Text>
      </View>
    </View>
  );
};

export default Settingss;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
  },
  title: {
    backgroundColor: "#14213D",
    padding: 15,
  },
  options:{
    padding: 20
  }
});
