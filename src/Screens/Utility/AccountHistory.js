import { StyleSheet, Text, View } from "react-native";
import React from "react";

const AccountHistory = () => {
  return (
    <View style={styles.container}>
      <View style={styles.amount}>
        <Text style={{fontSize:32, color: "green", fontWeight: "bold"}}>XAF 5,000,000</Text>
      </View>
    </View>
  );
};

export default AccountHistory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  amount:{
      alignItems:"center",
      justifyContent: 'center',
      marginTop: 50
  }
});
