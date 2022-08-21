import { StatusBar } from "expo-status-bar";
import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Button,
  ActivityIndicator,
} from "react-native";
import Constants from "expo-constants";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  pickImage,
  askForPermission,
  uploadImage,
  selectImage,
} from "../../utils";
import { auth, db } from "../../firebase";
import { updateProfile, signOut } from "@firebase/auth";
import { doc, setDoc, getDoc } from "@firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { GlobalContext } from "../context/reducers/Provider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PictureSelectModal from "../components/MoneyTransferModal";

export default function Profile() {
  const [displayName, setDisplayName] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [permissionStatus, setPermissionStatus] = useState(null);
  const [AccountBalance, setAccountBalance] = useState(0);
  const [verified, setVerified] = useState(false);
  const [verifiedAt, setVerifiedAt] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const navigation = useNavigation();
  const [submit, setSubmit] = useState(false);
  const {
    userData,
    setUserData,
    setLoadingData,
    loadingData,
    modalVisible,
    setModalVisible,
  } = useContext(GlobalContext);

  useEffect(() => {
    (async () => {
      const status = await askForPermission();
      setPermissionStatus(status);
    })();
  }, []);

  const {
    theme: { colors },
  } = useContext(GlobalContext);

  const generateAccountNumber = (length) => {
    var result = '';
    var characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return `flw_tx_ref_${result}`;
  };
  async function handlePress() {
    const user = auth.currentUser;
    let photoURL;
    if (selectedImage) {
      const { url } = await uploadImage(
        selectedImage,
        `images/${user.uid}`,
        "profilePicture"
      );
      photoURL = url;
    }
    const userData = {
      Account:{
        AccountNumber: generateAccountNumber(15),
        AccountBalance
      },
      displayName,
      phoneNumber,
      verified,
      verifiedAt,
      email: user.email,
    };
    if (photoURL) {
      userData.photoURL = photoURL;
    }

    await Promise.all([
      updateProfile(user, userData),
      setDoc(doc(db, "users", user.uid), { ...userData, uid: user.uid }),
    ]);
    navigation.navigate("verification");
    if (user) {
      const userRef = doc(db, "users", user.uid);
      
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        await AsyncStorage.setItem("userData", JSON.stringify(userSnap.data()));
        setUserData(userSnap.data());
        setLoadingData(true);
      }
    }
  }

  async function handleProfilePicture() {
    const result = await pickImage();
    if (!result.cancelled) {
      setSelectedImage(result.uri);
    }
  }

  async function selectProfilePicture() {
    const result = await selectImage();
    if (!result.cancelled) {
      setSelectedImage(result.uri);
    }
  }

  if (!permissionStatus) {
    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff",
          flex: 1,
        }}
      >
        <ActivityIndicator size="large" color="#FFA500" />
      </View>
    );
  }
  if (permissionStatus !== "granted") {
    return <Text>You need to allow this permission</Text>;
  }
  return (
    <React.Fragment>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          flex: 1,
          paddingTop: Constants.statusBarHeight + 20,
          padding: 20,
        }}
      >
        <Text style={{ fontSize: 22, color: colors.foreground }}>
          Profile Info
        </Text>
        <Text style={{ fontSize: 14, color: colors.text, marginTop: 20 }}>
          Please provide your name and an optional profile photo
        </Text>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={{
            marginTop: 30,
            borderRadius: 120,
            width: 120,
            height: 120,
            backgroundColor: colors.background,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {!selectedImage ? (
            <MaterialCommunityIcons
              name="camera-plus"
              color={colors.iconGray}
              size={45}
            />
          ) : (
            <Image
              source={{ uri: selectedImage }}
              style={{ width: "100%", height: "100%", borderRadius: 120 }}
            />
          )}
        </TouchableOpacity>
        <TextInput
          placeholder="Type your name"
          value={displayName}
          onChangeText={setDisplayName}
          style={{
            borderBottomColor: colors.primary,
            marginTop: 40,
            borderBottomWidth: 2,
            width: "100%",
          }}
        />
        {submit == true ? (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#fff",
              borderRadius: 30,
              marginTop: 10,
              width: 50,
              height: 50,
            }}
          >
            <ActivityIndicator size="large" color="#FFA500" />
          </View>
        ) : null}
        <PictureSelectModal
          cameraSubmit={handleProfilePicture}
          imageSubmit={selectProfilePicture}
        />

        <View style={{ marginTop: "auto", width: 80 }}>
          <Button
            title="Next"
            color={colors.secondary}
            onPress={() => {
              handlePress();
              setSubmit(true);
            }}
            disabled={!displayName}
          />
        </View>
      </View>
    </React.Fragment>
  );
}
