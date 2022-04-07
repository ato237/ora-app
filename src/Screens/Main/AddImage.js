import { Platform, PlatformColor, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Avatar } from "react-native-elements";
import { GlobalContext } from "../../context/reducers/Provider";
import { TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { db, storage } from "../../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { setUserDataAsync } from "expo-facebook";
import { LogBox } from "react-native";
import * as ImagePicker from "expo-image-picker";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  uploadBytes,
} from "firebase/storage";
import { async } from "@firebase/util";

LogBox.ignoreLogs(["Setting a timer"]);

const AddImage = ({ navigation }) => {
  const [file, setFile] = useState("");
  const [uid, setUid] = useState("");
  const metadata = {
    contentType: "image/jpeg",
  };
  const PickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.cancelled) {
      uploadFile(result.uri);
      navigation.navigate("BottomTab");
    }
  };
  const uploadFile = async (file) => {
    const name = datas.userData.created;
    const storageRef = ref(storage, "profilepic.jpg" + name);
    const img = await fetch(file);
    const bytes = await img.blob();

    uploadBytes(storageRef, bytes);

    getDownloadURL(storageRef).then((downloadURL) => {
      onAuthStateChanged(auth, (user) => {
        if (user != null) {
          const userRef = doc(db, "users", user.uid);
          updateDoc(userRef, {
            picture: downloadURL,
          });
          getDoc(userRef).then((docSnap) => {
            datas.setUserData(docSnap.data());
          });
        }
      });
    });
  };
  // file && uploadFile();

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry we need camera roll permissions to make this work");
        }
      }
    })();
  }, []);
  const datas = useContext(GlobalContext);
  const auth = getAuth();

  // Get a reference to the storage service, which is used to create references in your storage bucket

  // Create a storage reference from our storage service

  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: "#14213D",
          padding: Platform.OS == "ios" ? 20 : 10,
          justifyContent: "center",
          alignItems: "center",
        }}
      ></View>
      <View style={styles.options}>
        <TouchableOpacity
          style={{ justifyContent: "center", alignItems: "center" }}
        >
          <Avatar
            containerStyle={{ width: 250, height: 250 }}
            size="large"
            rounded
            // source={{ uri: datas.userData.picture == null? null: datas.userData.picture  }}
          />
        </TouchableOpacity>
        <Text style={{ fontSize: 25, textAlign: "center" }}>
          {/*datas.userData.firstName + " " + datas.userData.lastName*/}
        </Text>
        <TouchableOpacity
          style={{
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "blue",
          }}
          onPress={PickImage}
        >
          <Text style={{ color: "white", padding: 20 }}>Add Image</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddImage;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
  },
  title: {
    backgroundColor: "#14213D",
    padding: 15,
  },
  options: {
    padding: 20,
  },
});
