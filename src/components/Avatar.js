import { StyleSheet, Text, Image } from "react-native";
import React from "react";

const Avatar = ({ size, user }) => {
  return (
    <Image
      style={{ width: size, height: size, borderRadius: size }}
      source={
        user.photoURL
          ? { uri: user.photoURL }
          : require("../../assets/person.webp")
      }
      resizeMode="cover"
    />
  );
};

export default Avatar;

const styles = StyleSheet.create({});
