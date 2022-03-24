import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Ionicons } from "react-native-vector-icons";
import { TouchableOpacity } from "react-native";
import Feature from "./Feature";
import { Avatar } from "react-native-paper";

const HomeContactsSection = () => {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 20, padding: 20 }}>Top Chat & Sends</Text>
      <ScrollView>
        <View style={styles.bubules}>
          <Feature
            title="Add Contact"
            icon="add"
            sizes={70}
            link="Currency Converter"
          />
          <TouchableOpacity style={styles.addIcon}></TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeContactsSection;

const styles = StyleSheet.create({
  container: {},
  bubules: {
    flexDirection: "row",
  },
  addIcon: {
    paddingHorizontal: 30,
  },
});
